import CategoryProduct from "@/components/CategoryProduct";
import SideNavbar from "@/components/SideNavbar";
import { TProduct } from "@/types";

//fetch product by category
const getProducts = async (): Promise<TProduct[] | undefined> => {
	const url = process.env.API_URL;
	const response = await fetch(`${url}/api/products`);

	if (response.ok) return response.json();
};

export default async function Home() {
	const products = await getProducts();
	return (
		<section className="flex flex-col md:flex-row gap-2">
			<aside className="w-full md:w-[220px] shrink-0">
				<SideNavbar />
			</aside>
			<div className="flex-1 py-2">
				<h2 className="capitalize mb-8">All Products</h2>
				<section className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
					{products &&
						products?.map((item) => (
							<CategoryProduct product={item && item} key={item?.id} />
						))}
				</section>
			</div>
		</section>
	);
}
