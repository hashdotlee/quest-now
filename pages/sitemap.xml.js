import slug from "slug";
import API_URL from "../utils/constants/apiURL";

function generateSiteMap(questions) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${questions
    .map(
      (question) => `
		<url>
			<loc>https://quest.hashdotlee.cyou/questions/${question.ID}/${slug(
        question.title
      )}</loc>
			<lastmod>${question.UpdatedAt}</lastmod>
			<changefreq>weekly</changefreq>
			<priority>0.8</priority>
		</url>
	`
    )
    .join("")}
</urlset>`;
}

export async function getServerSideProps({res}) {
  const questions = await fetch(`${API_URL}/questions`)
    .then((res) => res.json())

  const sitemap = generateSiteMap(questions?.data);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();
  return {
    props: {
    },
  };
}

export default function SiteMap() {
  return null;
}
