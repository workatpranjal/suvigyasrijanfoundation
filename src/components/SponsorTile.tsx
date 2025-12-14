import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SponsorTileProps {
  sponsor: {
    id: number;
    name: string;
    logo: string;
    category: string;
    tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  };
  onClick: () => void;
}

const SponsorTile = ({ sponsor, onClick }: SponsorTileProps) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-slate-200 text-slate-800';
      case 'gold':
        return 'bg-yellow-200 text-yellow-800';
      case 'silver':
        return 'bg-gray-200 text-gray-800';
      case 'bronze':
        return 'bg-orange-200 text-orange-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-full h-24 flex items-center justify-center bg-gray-50 rounded-lg">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {sponsor.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {sponsor.category}
            </Badge>
            <Badge className={`text-xs ${getTierColor(sponsor.tier)}`}>
              {sponsor.tier.charAt(0).toUpperCase() + sponsor.tier.slice(1)} Sponsor
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SponsorTile;