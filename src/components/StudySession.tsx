import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { sampleFlashcards, decks } from '../data/mindforge-sample-data';

interface StudySessionProps {
  deckId: string;
  onEndSession: () => void;
}

export const StudySession: React.FC<StudySessionProps> = ({ deckId, onEndSession }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const deck = decks.find(d => d.id === deckId);
  const cards = sampleFlashcards.filter(card => card.deckId === deckId);

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowAnswer(false);
    } else {
      onEndSession();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Estudando: {deck?.title}</h2>
      <Card>
        <CardHeader>
          <CardTitle>Cartão {currentCardIndex + 1} de {cards.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold mb-4">{cards[currentCardIndex].front}</p>
          {showAnswer && (
            <p className="text-md mb-4">{cards[currentCardIndex].back}</p>
          )}
          <div className="space-x-2">
            {!showAnswer && (
              <Button onClick={() => setShowAnswer(true)}>Mostrar Resposta</Button>
            )}
            {showAnswer && (
              <>
                <Button onClick={handleNextCard}>Fácil</Button>
                <Button onClick={handleNextCard}>Bom</Button>
                <Button onClick={handleNextCard}>Difícil</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};