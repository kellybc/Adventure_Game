import Link from 'next/link';

export default function Home() {
  return <main style={{padding:32}}><h1>Shards of Arventyr: Expedition</h1><p>First playable foundation.</p><Link href="/game">Enter Expedition</Link></main>;
}
