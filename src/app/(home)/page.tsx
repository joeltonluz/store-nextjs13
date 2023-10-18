import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banners";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <div>
      <PromoBanner
        src="/banner-home-01.png"
        alt="Até 55% de desconto esse mês!"
      />
      <div className="mt-8 px-5">
        <Categories />
      </div>

      <div className="mt-8">
        <SectionTitle>ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <div>
        <PromoBanner
          src="/banner-home-02.png"
          alt="Até 55% de desconto nos mouses!"
        />
      </div>

      <div className="mt-8">
        <SectionTitle>keyboards</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
