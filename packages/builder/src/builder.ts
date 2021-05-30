export function emitCode(metadata: { name: string }): string {
  const code = `
import React from 'react';
import { Button } from 'antd';

function Page() {
  return <><Button onClick={() => alert('world')}>${metadata.name}</Button></>;
}
  
export default Page;
`;

  return code;
}
