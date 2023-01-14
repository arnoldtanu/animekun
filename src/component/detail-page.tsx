import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useLocalStorage } from "../helper/hooks";
import { MY_FAV } from "../helper/storage-name";

export interface IDetailPage {
  animeId: number;
  title: string;
  imgUrl: string;
  popularity: number;
  genres: Array<string>;
  bannerUrl: string;
  description: string;
  averageScore: number;
}

function DetailPage(props:IDetailPage) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [storageData, setStorageData]:any = useLocalStorage(MY_FAV,[]);

  useEffect(()=>{
    storageData.map((data:any,index:number)=>{
      if (data.id === props.animeId) setIsFavorite(true);
    });
  },[storageData]);

  const addToFav = ()=>{
    const temp : any = [{
      id: props.animeId,
      title: {
        english: props.title
      },
      coverImage: {
        large: props.imgUrl
      },
      popularity: props.popularity
    }];
    setStorageData([...storageData, ...temp]);
    setIsFavorite(true);
  };

  const removeFromFav = ()=>{
    let temp : any = [];
    storageData.map((data:any,index:number)=>{
      if (data.id !== props.animeId) temp.push(data);
    });
    setStorageData(temp);
    setIsFavorite(false);
  };

  return (<><br/>
    <Container>
      <Row>
        <Col lg={3}>
          <Image src={props.imgUrl}/><br/><br/>
          {!isFavorite ? <Button variant="primary" onClick={addToFav}>Add to My Favorite</Button> : <Button variant="danger" onClick={removeFromFav}>Remove from My Favorite</Button>}<br/><br/>&nbsp;
        </Col>
        <Col lg={9}>
          <h1>{props.title}</h1>
          <b>Average Score : </b>{props.averageScore}<br/>
          <b>Genres : </b>{props.genres.join(', ')}<br/><br/>
          <b>Description : </b><br/>
          {props.description.replace(/(<([^>]+)>)/ig,"")}<br/>
        </Col>
      </Row>
    </Container>
    <Container fluid>
      {/* <Image src={props.bannerUrl}/> */}
    </Container>
  </>);
}

export default DetailPage;