"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MatchResultCard from '@/components/MatchResultCard';
import { generateMatches, createRelationship } from '@/lib/api';

interface Match {
  mentor_id: string;
  mentor_name: string;
  mentor_expertise: string[];
  compatibility_score: number;
  explanation: string;
}

interface GenerateMatchesResponse {
  success: boolean;
  data?: {
    matches: Match[];
  };
  error?: string;
}

interface CreateRelationshipResponse {
  success: boolean;
  data?: {
    relationship_id: string;
  };
  error?: string;
}

export default function MatchingPage() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMatches = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generateMatches('startup_1') as GenerateMatchesResponse;
      if (response.success && response.data?.matches) {
        setMatches(response.data.matches);
      } else {
        setError(response.error || 'Failed to fetch matches');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const handleCreateRelationship = async (match: Match) => {
    try {
      const response = await createRelationship({
        startup_id: 'startup_1',
        mentor_id: match.mentor_id,
        compatibility_score: match.compatibility_score
      }) as CreateRelationshipResponse;

      if (response.success && response.data?.relationship_id) {
        router.push(`/relationship/${response.data.relationship_id}`);
      } else {
        setError(response.error || 'Failed to create relationship');
      }
    } catch (err) {
      setError('An unexpected error occurred while creating relationship');
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
      <h1 className="text-4xl font-[family-name:--font-display] text-white fade-up-0">
        Mentor Matches
      </h1>
      <p className="text-muted-foreground text-sm fade-up-80">
        AI-generated compatibility analysis for NeuroFlow AI
      </p>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 bg-card border border-white/[0.06] rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col gap-4">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchMatches}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : matches.length === 0 ? (
        <p className="text-muted-foreground">No matches found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {matches.map((match, index) => (
            <MatchResultCard
              key={match.mentor_id}
              mentorName={match.mentor_name}
              mentorExpertise={match.mentor_expertise}
              compatibilityScore={match.compatibility_score}
              explanation={match.explanation}
              onCreateRelationship={() => handleCreateRelationship(match)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
