import fs from "fs/promises";
import Link from "next/link";
import path from "path";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
      <div>
        <Link href="/">Back</Link>
      </div>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  console.log("context", context);
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  // will call getStaticProps with each return path parameters
  return {
    paths: [
      { params: { pid: "p1" } },
      { params: { pid: "p2" } },
      { params: { pid: "p3" } },
    ],
    // fallback: false, // will return 404 if input params not in return array
    fallback: true, // will generate page on request, and call page with empty data, after page was generated will replace with data
  };
}

export default ProductDetailPage;
