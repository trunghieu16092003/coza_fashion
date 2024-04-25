import { Row, Col } from "antd";

import BlogCard from "../../components/BlogCard";
import { Container, Section, BlogContentLeft } from "./styled";
import BlogSidebarRight from "../../components/BlogSidebarRight";
const Blog = () => {
  return (
    <Section>
      <Container>
        <Row>
          <BlogContentLeft span={16}>
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </BlogContentLeft>
          <Col span={8}>
            <BlogSidebarRight />
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Blog;
