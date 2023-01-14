import Link from 'next/link';
import Card from 'react-bootstrap/Card';

export interface IAnimeCard {
  animeId: number;
  title: string;
  imgUrl: string;
  popularity?: number;
}

function AnimeCard(props:IAnimeCard) {
  return (
    <Link href={'/anime/'+props.animeId} style={{textDecoration: 'none', color: '#000'}}>
      <Card style={{ width: '18rem', marginBottom: '3rem' }}>
        <Card.Img variant="top" src={props.imgUrl} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.popularity ? 'Popularity: '+props.popularity : ' '}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default AnimeCard;