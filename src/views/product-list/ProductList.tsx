import { useEffect } from "react";
import { Alert, CircularProgress, Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";
import SideBar from "./parts/SideBar";
import List from "./parts/ProductList";
import "./styles/styles.scss";

export default function ProductList() {
  const { error, load } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      await dispatch(fetchProducts());
    };

    load();
  }, [dispatch]);

  return (
    <Container className='product-list-view'>
      <SideBar />
      {error && <Alert severity='error'>{error}</Alert>}
      {load && <CircularProgress />}
      <List />
    </Container>
  );
}
