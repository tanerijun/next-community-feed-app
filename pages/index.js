import Questions, {
  getServerSideProps as getServerSidePropsQuestions,
} from './questions';

export default function Home(props) {
  return <Questions {...props} />;
}

export function getServerSideProps(context) {
  return getServerSidePropsQuestions(context);
}
