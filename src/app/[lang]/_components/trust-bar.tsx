"use client";

import { StatsCounter } from "@/components/stats-counter";

interface TrustBarProps {
  labels: {
    projects: string;
    experience: string;
    clients: string;
    tenders: string;
  };
}

export function TrustBar({ labels }: TrustBarProps) {
  const items = [
    { value: 25, suffix: "+", label: labels.projects },
    { value: 5, suffix: "+", label: labels.experience },
    { value: 15, suffix: "+", label: labels.clients },
    { value: 10, suffix: "+", label: labels.tenders },
  ];

  return <StatsCounter items={items} />;
}
