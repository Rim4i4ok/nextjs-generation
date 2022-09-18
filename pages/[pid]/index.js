import fs from "fs/promises";
import Link from "next/link";
import path from "path";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

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
    fallback: false, // ???
  };
}

export default ProductDetailPage;
