import { formatCurrency } from "@/helpers/formatCurrency";
import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProductClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-primary-foreground flex items-center justify-center rounded-lg h-[77px] w-[77px]">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              {formatCurrency(product.totalPrice)}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                {formatCurrency(Number(product.basePrice))}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              size={"icon"}
              variant={"outline"}
              className="h-8 w-8"
              onClick={handleDecreaseProductClick}
            >
              <MinusIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size={"icon"}
              variant={"outline"}
              className="h-8 w-8"
              onClick={handleIncreaseProductClick}
            >
              <PlusIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button size="icon" variant="outline" onClick={handleRemoveProductClick}>
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;