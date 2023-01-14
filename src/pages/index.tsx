import { useEffect, useMemo, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLazyQuery } from '@apollo/client';
import { POPULAR_ANIME_BY_GENRE } from '../helper/graphql-query';
import GenreSelect from '../component/dropdown-genre';
import AnimeCard from '../component/card';
import { ALL_GENRE } from '../helper/genre';
import InfiniteScroll from 'react-infinite-scroller';

export default function Home() {
  const [page, changePage] = useState(0);
  const [genre, setGenre] = useState(ALL_GENRE);
  const [getAnime, { loading, error, data }] = useLazyQuery(POPULAR_ANIME_BY_GENRE(page, genre));
  const [list, setList]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    if (!loading && typeof data !== 'undefined'){
      if (data.Page.media){
        setList([...list, ...data.Page.media]);
        setIsLoading(false);
      }
    }
  },[loading,data]);

  const resetPage = () => {
    changePage(1);
    setList([]);
    setIsLoading(true);
    getAnime();
  }

  const nextPage = () => {
    if (!isLoading){
      changePage(page+1);
      setIsLoading(true);
      getAnime();
    }
  }

  const onChangeGenre = (value: string) => {
    setGenre(value);
    resetPage();
  };

  return (
    <>
    <Container><br/>
      <Row>
        <Col>
          <h2>Anime List by Popularity</h2>
        </Col>
        <Col style={{display:'flex', justifyContent:'right'}}>
          <GenreSelect onChangeGenre={onChangeGenre}/>
        </Col>
      </Row><br/>
      <div style={{overflow: 'auto'}}>
        <InfiniteScroll
          pageStart={0}
          loadMore={nextPage}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ... </div>}>
        <Row>
          {list.map((data:any,index:number)=>{
            return <Col key={"listAnime"+index}><AnimeCard animeId={data.id} title={data.title.english} imgUrl={data.coverImage.large} popularity={data.popularity}/></Col>;
          })}
        </Row>
        </InfiniteScroll>
      </div>
    </Container>
    </>
  )
}
