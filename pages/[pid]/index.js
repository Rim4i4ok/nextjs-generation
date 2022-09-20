import fs from "fs/promises";
import Link from "next/link";
import path from "path";
import { Fragment } from "react";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // // fallback: true
  //   if (!loadedProduct) {
  //     return <p>Loading...</p>;
  //   }

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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  console.log("context", context);
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((item) => item.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((item) => item.id);
  const params = ids.map((item) => ({ params: { pid: item } }));

  return {
    paths: params,
    fallback: false,
  };
}

export default ProductDetailPage;
