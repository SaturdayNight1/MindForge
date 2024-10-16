import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { api } from '../services/api';

interface Deck {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  rating: number;
}

export const Marketplace: React.FC = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await api.get('/marketplace/decks');
        setDecks(response.data);
      } catch (error) {
        console.error('Failed to fetch marketplace decks:', error);
      }
    };
    fetchDecks();
  }, []);

  const handlePurchase = async (deckId: string) => {
    try {
      await api.post(`/marketplace/purchase/${deckId}`);
      alert('Deck purchased successfully!');
    } catch (error) {
      console.error('Failed to purchase deck:', error);
      alert('Failed to purchase deck. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <Card key={deck.id}>
            <CardHeader>
              <CardTitle>{deck.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{deck.description}</p>
              <p className="mt-2">Author: {deck.author}</p>
              <p>Rating: {deck.rating}/5</p>
              <p className="font-bold mt-2">Price: ${deck.price.toFixed(2)}</p>
              <Button onClick={() => handlePurchase(deck.id)} className="mt-4">Purchase</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};