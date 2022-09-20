import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>
          <Link href={`/products/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("RE-generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: "/no-data", // will redirect to no-data page
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true, // will return 404 page if no data
    };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // every 10 seconds new page will generate
  };
}

export default HomePage;
