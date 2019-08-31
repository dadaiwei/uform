import React from "react";
import { Anchor } from "antd";

const { Link } = Anchor;

function PageAnchor(props) {
  const links = props.links || [];
  const renderChildLinks = (items) =>
    items.map((item) => <Link key={item.href} href={item.href} title={item.title} />);
  return (
    <div className='page-anchor'>
      <Anchor>
        {links.map((item) => {
          if (!item.children) return <Link key={item.href} href={item.href} title={item.title} />;
          return (
            <Link key={item.href} href={item.href} title={item.title}>
              {renderChildLinks(item.children)}
            </Link>
          );
        })}
      </Anchor>
    </div>
  );
}

export default PageAnchor;
