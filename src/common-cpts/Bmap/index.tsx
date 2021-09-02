import { Wrapper } from './styled';
import React from 'react';
import useViewModel from './view.model';
import styled from 'styled-components';

interface Props {
  style: any;
  handleLatLng?: (e: any) => void;
  lngLat?: {
    lng?: number;
    lat?: number;
  };
  address?: string;
  addressType?: boolean;
  id?: string;
  city?: string;
}

export function Bmap(props: Props): JSX.Element {
  const {} = useViewModel(props);
  return <div id={props.id} style={props.style}></div>;
}
