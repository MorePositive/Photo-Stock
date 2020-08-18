import React from "react";
import {
  Breadcrumbs as PSBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

import './breadcrumbs.css'

const Breadcrumbs = props => {

  const { history, location: { pathname } } = props;
  const pathnames = pathname.split("/").filter(x => x);

  return (
    <div className="breadcrumbs">
      <PSBreadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link className="link" onClick={() => history.push("/")}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link className="link" key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </PSBreadcrumbs>
    </div>
  );
};

export default withRouter(Breadcrumbs);
