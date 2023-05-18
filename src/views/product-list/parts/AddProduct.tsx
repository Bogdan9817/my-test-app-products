import { SetStateAction, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addProduct } from "../../../store/productSlice";
import { Product } from "../../../classes/Product";

interface ProductData {
  name: string;
  count: string;
  weight: string;
  height: string;
  width: string;
}

export default function AddProduct({ onClose }: { onClose: () => void }) {
  const [productData, setProductData] = useState<ProductData | {}>();
  const productQty = useAppSelector((state) => state.products.productsQty);
  const dispatch = useAppDispatch();
  const handleChange = (e: {
    target: {
      name: any;
      value: SetStateAction<string | undefined>;
    };
  }) => {
    setProductData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleReset = () => {
    setProductData({});
    onClose();
  };

  const handleSubmit = async () => {
    const product = new Product({ ...productData, id: productQty });
    dispatch(addProduct(product));
    onClose();
  };

  return (
    <Box className='flex-column' style={{ background: "white", padding: 24 }}>
      <TextField
        label='name'
        variant='standard'
        onChange={handleChange}
        name='name'
      />
      <TextField
        label='image'
        variant='standard'
        onChange={handleChange}
        name='imageUrl'
      />
      <TextField
        label='count'
        variant='standard'
        onChange={handleChange}
        name='count'
        type='number'
      />
      <TextField
        label='weight'
        variant='standard'
        onChange={handleChange}
        name='weight'
        type='number'
        InputProps={{
          startAdornment: <InputAdornment position='start'>g</InputAdornment>,
        }}
      />
      <Box className='flex space-between'>
        <TextField
          label='width'
          variant='standard'
          onChange={handleChange}
          name='width'
          type='number'
          className='margin-r'
        />
        <TextField
          label='height'
          variant='standard'
          onChange={handleChange}
          name='height'
          type='number'
        />
      </Box>
      <Box className='flex'>
        <Button onClick={handleSubmit}>Save</Button>
        <Button color='error' onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}
