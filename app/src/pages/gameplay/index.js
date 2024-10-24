import { Box, Button, Grid, Typography } from "@mui/material"
import useGameState from "../../hooks/useGameState"
import GameCard from "../../component/gamecard";

const GamePlay = () => {
    const { cards, moves, matches, timer, isGameComplete, handleCardClick, resetGame } = useGameState();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography sx={{marginBottom: "32px", marginTop: "32px"}}>
                Memory Card Game
            </Typography>
            <Grid container spacing={2} justifyContent="center" md={4} xs={4} sm={4} sx={{marginBottom: "16px"}}>
                {cards.map((card, index) => (
                    <Grid item key={index}>
                        <GameCard
                        value={card.value}
                        isFlipped={card.isFlipped || card.isMatched}
                        onClick={() => handleCardClick(index)}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box sx={{display: "flex", width: 400, justifyContent: "space-around", marginBottom: "16px"}}>
                <Typography>Moves: {moves}</Typography>
                <Typography>Matches: {matches}</Typography>
                <Typography>Timer: {timer}</Typography>
            </Box>
            {isGameComplete && (
                <Typography>
                    You Win!!
                </Typography>
            )}
            <Button variant="contained" color="primary" onClick={resetGame}>
                Restart Game
            </Button>
        </Box>
    )
}
export default GamePlay