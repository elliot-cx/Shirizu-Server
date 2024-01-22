import fetch, { Response } from "node-fetch";
import chalk from "chalk";

function log(string: string) {
    console.log(chalk.magenta("[AnimeSama]"), string);
}

const URL = "https://s22.anime-sama.fr/videos/?";

interface VideoInfo {
    href: string;
    time: number;
    size?: number | null;
    managed?: boolean | null;
    fetched?: boolean | null;
}

interface Episode {
    href: string,
    number: number
}

export namespace AnimesamaProvider {


    function fetchAnimeSama(paramValue: string = '/videos/'): Promise<VideoInfo[]> {
        const requestBody = {
            action: "get",
            items: {
                href: `${paramValue}`,
                what: 1
            }
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        };

        return new Promise((resolve, reject) => {
            fetch(URL, requestOptions)
                .then((response: Response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        reject('Erreur de requête');
                    }
                })
                .then(jsonResponse => {
                    const videoInfoList = jsonResponse as { items: VideoInfo[] };
                    if (paramValue == '/videos/') {
                        resolve(videoInfoList.items.slice(3).sort((a, b) => b.time - a.time));
                    } else {
                        resolve(videoInfoList.items.slice(3).filter(item => (item.href.includes(paramValue) || item.size) && item.href != paramValue));
                    }
                });
        });
    }

    /**
     * Get all episodes inside a folder
     * @param href folder href
     * @returns All episodes
     */
    export const getEpisodes = async (href: string): Promise<VideoInfo[]> => {
        const res = await fetchAnimeSama(href);

        // Initialize an array to collect episodes
        const episodes: VideoInfo[] = [];

        // Checking for potential subfolders
        const potentialFolders = res.filter(elem => !elem.size);

        // Filter out res to get episodes
        const directEpisodes = res.filter(elem => elem.size && elem.href.includes("VOST"));

        // Fetch episodes from directEpisodes
        episodes.push(...directEpisodes);

        for (const folder of potentialFolders) {
            if (folder.href.includes('VOSTFR')) {
                // If a VOSTFR folder is found, fetch episodes from it
                const vostfrFolderEpisodes = await getEpisodes(folder.href);
                episodes.push(...vostfrFolderEpisodes);
            } else if (!folder.href.includes('VF')) {
                // For other folders (e.g., S1, S2), fetch episodes from them
                const seasonEpisodes = await getEpisodes(folder.href);
                episodes.push(...seasonEpisodes);
            }
        }

        return episodes;
    };

    export const checkForUpdates = async () => {
        log('fetching Anime Sama...');
        const animeSamaEntries = await fetchAnimeSama();
        // const localEntries = await Shirizu.find({ provider: 'animesama' });

        for (const entry of animeSamaEntries) {
            const animeTitle = decodeURIComponent(entry.href.replace('/videos/', '').replace('/', ''));
            log(`Scanning ${animeTitle}...`);
            await ScanEntry(entry);
        }

    }

    export const UpdateShirizu = async (shirizu) => {

    }

    /**
 * Scans video entry and organizes episodes by season and number.
 * @param videoInfo 
 */
export const ScanEntry = async (videoInfo: VideoInfo): Promise<void> => {
    const episodes = await getEpisodes(videoInfo.href);

    if (episodes.length === 0) {
        log('No episodes found!');
        return;
    }

    const episodesBySeasons: { [season: number]: Episode[] } = {};

    const regex = /(?:S(\d)\D?E?)?(\d+)\D(?:VOST)/g;

    episodes.forEach((episode) => {
        const episodeName = decodeURIComponent(episode.href.split('/').pop());
        const matches = Array.from(episodeName.matchAll(regex));

        if (matches.length > 0) {
            const seasonNumber: number = parseInt(matches[0][1] ?? '1');
            const episodeNumber: number = parseInt(matches[0][2]);

            const seasonEpisodes = episodesBySeasons[seasonNumber] || [];
            const existingEpisode = seasonEpisodes.find((ep) => ep.number === episodeNumber);

            if (existingEpisode) {
                // Episode with the same number already exists, consider it part of the next season
                episodesBySeasons[seasonNumber + 1] = episodesBySeasons[seasonNumber + 1] || [];
                episodesBySeasons[seasonNumber + 1].push({ href: episode.href, number: episodeNumber });
            } else {
                episodesBySeasons[seasonNumber] = seasonEpisodes;
                episodesBySeasons[seasonNumber].push({ href: episode.href, number: episodeNumber });
            }
        } else {
            log('ERROR: No match!');
        }
    });

    // Sort episodes by episode number within each season
    Object.values(episodesBySeasons).forEach((seasonEpisodes: [Episode]) => {
        seasonEpisodes.sort((a, b) => a.number - b.number);
    });

    if (Object.keys(episodesBySeasons).length > 1) {
        console.log(episodesBySeasons);
    }
};
}