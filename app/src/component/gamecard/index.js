import { Card, CardContent, Typography } from "@mui/material";
const GameCard = ({ value, isFlipped, onClick }) => {
  return (
    <Card onClick={onClick} sx={{
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
    }}>
      <CardContent>
        <Typography>{isFlipped ? value : "?"}</Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
