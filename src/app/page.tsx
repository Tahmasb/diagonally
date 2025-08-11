import Link from "next/link";

const Home = () => {
  return (
    <div className="flex justify-center">
      <Link href="/products" className="text-center  mt-10 text-blue-600">
        products page
      </Link>
    </div>
  );
};

export default Home;
