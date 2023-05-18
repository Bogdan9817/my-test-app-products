import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

export default function List() {
  const navigate = useNavigate();
  const productList = useAppSelector((state) => state.products.list);

  const handleNavigate = (id: number) => {
    navigate(`/${id}`);
  };
  return (
    <Grid container spacing={2} className='list'>
      {productList.map((p) => {
        return (
          <Grid
            item
            key={p.id}
            onClick={() => {
              handleNavigate(p.id);
            }}
          >
            <div className='product flex-column'>
              <img className='img' src={p.imageUrl} alt='Sorry no img' />
              <Typography variant='h6'>{p.name}</Typography>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
