import React from "react";

//components
import Card from "../StyledComponents/Card";
import SingleOrder from "../Orders/SingleOrder";

const SingleDriver = ({ driver }) => {
  const name = `${driver.first_name} ${driver.last_name}`;

  return (
    <Card
      title={name}
      minHeight={300}
      minWidth={400}
      maxWidth={400}
      titleSize={20}
      titleWeight="500"
    >
      <div style={{ marginTop: "2rem" }}>
        {driver && driver.loads && driver.loads.length ? (
          driver.loads.map((load, index) => {
            return <SingleOrder load={load} key={index} />;
          })
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "grey",
              fontSize: 16,
              padding: "100px 20px",
            }}
          >
            No Loads
          </p>
        )}
      </div>
    </Card>
  );
};

export default SingleDriver;
