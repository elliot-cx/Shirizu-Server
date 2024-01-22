import fetch, { Response } from "node-fetch";
import { load } from "cheerio";
import chalk from "chalk";

function log(string: string) {
   console.log(chalk.red("[Nautiljon]"), string);
}

export namespace NautiljonProvider {

   const prefix = "https://www.nautiljon.com"
   const searchURL = `${prefix}/animes/?formats_include%5B%5D=1&q=`;

   interface nautiljonSearchResult {
      poster: string;
      title: string;
      altTitle: string;
      href: string;
      episodes: number;
   }

   interface nautiljonAnimeResult {
      title: string,
      alternateTitles: string[],
      status: string,
      rating: number,
      totalEpisodes: Number, // Total number of planned episodes
      provider: string, // Provider who added this shirizu (as a string)
      link: string, // Parent link
      genres: string[], // Reference to genres associated with this shirizu
      themes: string[], // Reference to themes associated with this shirizu
      recommendedAge: number, // Recommended age for the shirizu
      animationStudios: string[], // Reference to animation studios associated with this shirizu
      description: string,
      characters: nautiljonCharacter[],
      episodes: nautiljonAnimeEpisode[], // Reference to episodes in the shirizu
      sequelUrl: string, // Reference to sequel shirizu
      prequelUrl: string, // Reference to prequel shirizu
   }

   interface nautiljonAnimeEpisode {
      number: Number,
      title: string
   }

   interface nautiljonCharacter {
      name: string,
      imageUrl: string
   }

   export const Search = async (query: string): Promise<nautiljonSearchResult[]> => {
      return fetch(`${searchURL}${encodeURIComponent(query)}`, {
         headers: { "User-Agent": "insomnia/2023.5.8" }
      }).then((response: Response) => {
         if (response.ok) {
            return response.text()
         } else {
            throw new Error('Erreur de requête');
         }
      }).then(html => {
         const $ = load(html);
         const searchResults: nautiljonSearchResult[] = [];

         // Sélectionnez tous les éléments tr
         $('tr').each((_, element) => {
            const posterElement = $(element).find('img');
            const titleElement = $(element).find('a.eTitre');
            const altTitleElement = $(element).find('span.infos_small');
            const episodesElement = $(element).find('td.acenter').eq(4);

            var poster = `${prefix}${posterElement.attr('src')}`;
            poster = poster.replace('imagesmin', 'images');
            const title = titleElement.text();
            const href = titleElement.attr('href');
            var altTitle = altTitleElement.text();
            altTitle = altTitle.replace('(', '').replace(')', '');
            const episodes = parseInt(episodesElement.text()) || 0;

            // Si le titre et le lien existent, ajoutez-les aux résultats
            if (title && href) {
               searchResults.push({
                  poster: poster,
                  title: title.trim(),
                  altTitle: altTitle.trim(),
                  href: href,
                  episodes: episodes
               });
            }
         });

         return searchResults;
      });
   }

   export const Retreive = async (link: string): Promise<nautiljonAnimeResult> => {
      return fetch(link, {
         headers: { "User-Agent": "insomnia/2023.5.8" }
      }).then((response: Response) => {
         if (response.ok) {
            return response.text()
         } else {
            throw new Error('Erreur de requête');
         }
      }).then(html => {
         const $ = load(html);

         // Define all containers
         const mainContainer = $('.frame_left');
         const mainTitleContainer = $(mainContainer).find('h1.h1titre > span');
         const ratingContainer = $(mainContainer).find('span[itemprop="ratingValue"]');
         const altNameContainer = $(mainContainer).find('span[itemprop="alternateName"]');
         const genresContainer = $(mainContainer).find('li:contains("Genres")');
         const themesContainer = $(mainContainer).find('li:contains("Thèmes")');
         const ageContainer = $(mainContainer).find('li:contains("Age conseillé")');
         const studioContainer = $(mainContainer).find('li:contains("Studio d\'animation")');
         const descriptionContainer = $(mainContainer).find('.description');
         const charactersContainer = $(mainContainer).find('div.top_bloc:has(h2:contains("Personnages"))');
         const episodesContainer = $(mainContainer).find('table.tabepisodes > tbody');

         const title = mainTitleContainer.text();
         const rating = Number.parseFloat(ratingContainer.text());
         const altTitles = [altNameContainer.text()];
         const genres: string[] = [];
         const themes: string[] = [];
         const age = parseInt(ageContainer.text().match(/\d+/)?.[0] || '0');
         const studios: string[] = [];
         const description = descriptionContainer.text();
         const characters: nautiljonCharacter[] = [];
         const episodes: nautiljonAnimeEpisode[] = [];

         // Filling arrays
         genresContainer.find('span[itemprop="genre"]').each((_, elem) => {
            genres.push($(elem).text());
         });

         themesContainer.find('span[itemprop="genre"]').each((_, elem) => {
            themes.push($(elem).text());
         });

         studioContainer.find('span[itemprop="legalName"]').each((_, elem) => {
            studios.push($(elem).text());
         });

         charactersContainer.find('div.unPeople').each((_, elem) => {
            const img = $(elem).find('img');
            var imageurl = `${prefix}${img.attr('src')}`;
            imageurl = imageurl.replace('imagesmin', 'images');
            characters.push({
               name: $(elem).text(),
               imageUrl: imageurl
            } as nautiljonCharacter);
         });

         episodesContainer.find('tr').each((_, episodeContainer) => {
            const tds = $(episodeContainer).find('td');
            const number = Number.parseFloat(tds.eq(0).text());
            const title = tds.eq(1).find('.grey').text();
            const date = tds.eq(2).text();

            episodes.push({
               number: number,
               title: title
            } as nautiljonAnimeEpisode);
         });

         // Return all data
         return {
            title: title,
            rating: rating,
            alternateTitles: altTitles,
            genres: genres,
            themes: themes,
            recommendedAge: age,
            animationStudios: studios,
            description: description,
            characters: characters,
            episodes: episodes
         } as nautiljonAnimeResult;
      });
   }
}
