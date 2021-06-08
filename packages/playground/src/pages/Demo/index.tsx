import { Button } from 'antd';
import styles from './index.module.less';
import { PageManager } from '@robinjs/bootstrap';

function Demo() {
  return (
    <>
      <div className={styles.container}>
        <Button type="primary">hello</Button>
      </div>
      <PageManager path="demo" />
    </>
  );
}

export default Demo;
