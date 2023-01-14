import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AnimeCard from '../../component/card';
import { useLocalStorage } from '@/src/helper/hooks';
import { MY_FAV } from '@/src/helper/storage-name';

function MyFav() {
  const [list, setList]: any = useLocalStorage(MY_FAV,[]);

  return (
    <>
    <Container><br/>
      <Row>
        <Col>
          <h2>My Favorite Anime</h2>
        </Col>
      </Row><br/>
        <Row>
          { list.length > 0 ?
            list.map((data:any,index:number)=>{
              return <Col key={"listAnime"+index}><AnimeCard animeId={data.id} title={data.title.english} imgUrl={data.coverImage.large}/></Col>;
            }) : <Col>You don&apos;t have any Favorite</Col>
          }
        </Row>
    </Container>
    </>
  )
}

export default MyFav;