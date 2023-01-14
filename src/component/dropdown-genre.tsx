import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { useQuery } from '@apollo/client';
import { GENRE_LIST } from '../helper/graphql-query';
import { useEffect, useState } from 'react';
import { ALL_GENRE } from '../helper/genre';

export interface IDropdownGenre {
  onChangeGenre: (value:string) => void;
}

function GenreSelect(props: IDropdownGenre) {
  const { loading, error, data } = useQuery(GENRE_LIST());
  const [list, setList] : any = useState([]);
  const [title, setTitle] = useState('Filter By Genre');

  useEffect(()=>{
    if (data && data.GenreCollection) setList([ALL_GENRE,...data.GenreCollection]);
  },[data]);

  const changeValue = (eventKey: any, event: Object) => {
    setTitle('Genre : '+eventKey);
    props.onChangeGenre(eventKey);
  };

  return (
    <DropdownButton  id="dropdown-basic-button" title={title} onSelect={changeValue}>
      {
        list.map((data:any,index:number)=>{
          return <Dropdown.Item key={'dropdown'+index} eventKey={data}>{data}</Dropdown.Item>
        })
      }
    </DropdownButton>
  );
}

export default GenreSelect;