import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLazyQuery } from '@apollo/client';
import { ANIME_DETAIL } from "@/src/helper/graphql-query";
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Modal } from "react-bootstrap";
import Link from "next/link";
import DetailPage from "@/src/component/detail-page";

export default function DetailAnime(){
  const router = useRouter();
  const animeId : number = typeof router.query.id === "string" ? parseInt(router.query?.id) : 0;
  const [getAnime, { loading, error, data }] = useLazyQuery(ANIME_DETAIL(animeId));
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  useEffect(()=>{
    setIsLoading(false);
  },[data]);

  useEffect(()=>{
    getAnime();
  },[router]);

  useEffect(()=>{
    if (error){
      handleModalShow();
    }
  },[error]);

  if (isLoading){
    return (<>
      <Container>
        <Row>
          <Col><br/>
            <Spinner animation="border" role="status"/>
            <span> Loading...</span>
          </Col>
        </Row>
      </Container>
    </>);
  }
  else if (data){
    return (
      <DetailPage animeId={data.Media.id}
        title={data.Media.title.english}
        imgUrl={data.Media.coverImage.large}
        popularity={data.Media.popularity}
        genres={data.Media.genres}
        bannerUrl={data.Media.bannerImage}
        description={data.Media.description}
        averageScore={data.Media.averageScore}/>
    );
  } else {
      return (
        <Modal show={modalShow} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Not Found</Modal.Title>
          </Modal.Header>
          <Modal.Body>The anime you are looking for cannot be found, there might be a connection error.</Modal.Body>
          <Modal.Footer>
            <Link href={'/'}>Back to homepage</Link>
          </Modal.Footer>
        </Modal>
      );
  }
}
