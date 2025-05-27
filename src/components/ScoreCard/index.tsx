import { forwardRef } from "react";
import { IScore } from "../../types/entity-types";
import {
  Bads,
  Goods,
  Greats,
  MaxCombo,
  Misses,
  Perfects,
  ScoreCardContainer,
  ScoreDataContainer,
  ScoreDetailDiscription,
  ScoreDetailValues,
  ScoreDetailedContainer,
  ScoreGradeAndPlating,
  ScoreInfoContainer,
  ScorePlate,
  ScoreValue,
  ScoreGrade,
} from "./styles";
import { getGradeImageFileName } from "../../utils/getGradeImageFileName";
import { MusicLevelMiniature, MusicWrapper, PlayerInfoWrapper, PlayerMiniature } from "../../styles/global";

interface ScoreCardProps {
  score: IScore | undefined;
}

// Wrap component with forwardRef
const ScoreCard = forwardRef<HTMLDivElement, ScoreCardProps>(
  ({ score }, ref) => {
    return (
      <ScoreCardContainer ref={ref}>
        <ScoreInfoContainer>
          <PlayerInfoWrapper>
            <PlayerMiniature
              src={score?.player.profilePicture || "/img/default_player.png"}
              alt={score?.player.nickname}
            />
            {score?.player.nickname}
          </PlayerInfoWrapper>
        {score?.music && (
          <MusicWrapper>
            <MusicLevelMiniature
              src={`/static/musics/${score.music.mode}/${score.music.mode.charAt(0).toUpperCase()}${score.music.level
                .toString()
                .padStart(2, "0")}.png`}
            />
            {score.music.name}
          </MusicWrapper>
        )}

        {score?.event && <p>Evento: {score.event.name}</p>}
        {score?.category && <p>Categoria: {score.category.name}</p>}
        {score?.phase && <p>Fase: {score.phase.phase_number}</p>}
        </ScoreInfoContainer>


        <ScoreDataContainer>
          <ScoreGradeAndPlating>
            <ScoreValue>{score?.value.toLocaleString()}</ScoreValue>
            <div>
              <ScoreGrade src={getGradeImageFileName(score)} />
            </div>
            <div>
              {score?.plate && (
                <ScorePlate
                  src={`/static/musics/plating/${score?.plate.toLowerCase()}.png`}
                />
              )}
            </div>
          </ScoreGradeAndPlating>

          <ScoreDetailedContainer>
            <ScoreDetailDiscription>
              <Perfects>PERFECT</Perfects>
              <Greats>GREAT</Greats>
              <Goods>GOOD</Goods>
              <Bads>BAD</Bads>
              <Misses>MISS</Misses>
              <MaxCombo>MAX COMBO</MaxCombo>
            </ScoreDetailDiscription>

            <ScoreDetailValues>
              <Perfects>{score?.perfect}</Perfects>
              <Greats>{score?.great}</Greats>
              <Goods>{score?.good}</Goods>
              <Bads>{score?.bad}</Bads>
              <Misses>{score?.miss}</Misses>
              <MaxCombo>{score?.max_combo}</MaxCombo>
            </ScoreDetailValues>
          </ScoreDetailedContainer>
        </ScoreDataContainer>
      </ScoreCardContainer>
    );
  }
);

export default ScoreCard;
