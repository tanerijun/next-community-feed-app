import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';

const QuestionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const CardLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

export default function Questions({ questions, hasMore, page }) {
  return (
    <>
      <Head>
        <title>Questions</title>
      </Head>
      <QuestionsContainer>
        <h2>Questions</h2>

        <div>
          {questions.map((question) => (
            <Link
              key={question.question_id}
              href={`/questions/${question.question_id}`}
            >
              <CardLink>
                <Card
                  key={question.question_id}
                  title={question.title}
                  views={question.view_count}
                  answers={question.answer_count}
                />
              </CardLink>
            </Link>
          ))}
        </div>
        <Pagination currentPage={parseInt(page) || 1} hasMore={hasMore} />
      </QuestionsContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  const { page } = context.query;

  const data = await fetch(
    `https://api.stackexchange.com/2.2/questions?${
      page ? `page=${page}&` : ''
    }order=desc&sort=hot&tagged=reactjs&site=stackoverflow`
  );
  const result = await data.json();

  return {
    props: {
      questions: result.items,
      hasMore: result.has_more,
      page: page || 1,
    },
  };
}
