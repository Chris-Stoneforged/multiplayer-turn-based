import React from 'react';

type PlayerDetailsProps = {
  name: string;
};

export default function playerDetails({ name }: PlayerDetailsProps) {
  return <div>{name}</div>;
}
