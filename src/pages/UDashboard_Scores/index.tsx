import { FunctionComponent, useEffect, useState, useRef, useCallback } from "react";
import { GlobalContainer } from "../../styles/global";
import { useScore } from "../../providers/Scores";
import ScoreCard from "../../components/ScoreCard";

interface UDashboardScoresProps {}

const UDashboardScores: FunctionComponent<UDashboardScoresProps> = () => {
  const { fetchPaginatedScores, paginatedScores, hasMoreScores } = useScore();

  const [page, setPage] = useState(1);
  const limit = 10;

  const observer = useRef<IntersectionObserver | null>(null);

  const lastScoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreScores) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMoreScores]
  );

  useEffect(() => {
    fetchPaginatedScores(page, limit, "DESC");
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, []);

  return (
    <GlobalContainer>
      {paginatedScores.length > 0 ? (
        paginatedScores.map((score, idx) => {
          if (idx === paginatedScores.length - 1) {
            return <ScoreCard ref={lastScoreRef} key={score.score_id} score={score} />;
          }
          return <ScoreCard key={score.score_id} score={score} />;
        })
      ) : (
        <p>No scores found.</p>
      )}
    </GlobalContainer>
  );
};

export default UDashboardScores;
