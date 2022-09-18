function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: [
        {
          id: 1,
          title: "product 1",
        },
      ],
    },
  };
}

export default HomePage;
