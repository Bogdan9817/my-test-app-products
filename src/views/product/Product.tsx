import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteProduct, fetchProduct, getItem } from "../../store/productSlice";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import "./styles/styles.scss";

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { list, searchingItem, error, load } = useAppSelector(
    (state) => state.products
  );

  const handleDelete = async () => {
    if (searchingItem && searchingItem.id) {
      dispatch(deleteProduct(`${searchingItem.id}`));
      navigate("/");
    }
  };

  useEffect(() => {
    const load = async () => {
      if (productId) {
        if (list.length) {
          dispatch(getItem(productId));
        } else {
          await dispatch(fetchProduct(productId));
        }
      }
    };
    load();
  }, [productId, dispatch, list.length]);

  return (
    <Container>
      {error && <Alert severity='error'>{error}</Alert>}
      {load && <CircularProgress />}
      {searchingItem && (
        <Box className='flex product-view'>
          <Box>
            <img src={searchingItem.imageUrl} alt='No img:(' />
          </Box>
          <Box className='product-info flex-column'>
            <Typography variant='h2'>{searchingItem.name}</Typography>
            <Box className='flex'>
              <Typography marginRight={1} className='label'>
                Count:
              </Typography>
              <Typography>{searchingItem.count}</Typography>
            </Box>
            <Box className='flex'>
              <Typography marginRight={1} className='label'>
                Weight:
              </Typography>
              <Typography>{searchingItem.weight}g</Typography>
            </Box>
            <Box className='flex'>
              <Box className='flex'>
                <Typography marginRight={1} className='label'>
                  Width:
                </Typography>
                <Typography marginRight={1}>
                  {searchingItem.size.width}
                </Typography>
              </Box>
              <Box className='flex'>
                <Typography marginRight={1} className='label'>
                  Height
                </Typography>
                <Typography>{searchingItem.size.height}</Typography>
              </Box>
            </Box>
            <Box className='flex'>
              <Button onClick={handleDelete} variant='outlined' color='error'>
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
