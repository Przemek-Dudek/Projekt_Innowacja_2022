import {React, map} from "react";

export function UserProducts({myItems}) {
       return (
        <div className="container">
            <div className="container-box">
                <h2>Moje Przedmioty</h2>
                <div className="mainMarketPlace">
              {1&&(
                myItems.map((struct, index) => {
                  if (index % 3 === 0) {
                    return (
                      <div className="boxBody" key={index} style={{ clear: 'both' }}>
                        <div className="box" key={index} data-index={index}>
                          <div className="boxTitle">{myItems[index].name}</div>
                          <div className="boxFooter">
                              <div className="boxDescription">{Number(struct.cost)} $TTPSC</div>
                          </div>
                        </div>
                        {this.state.products[index + 1] && (
                          <div
                            className="box"
                            key={index + 1}
                            data-index={index + 1}
                          >
                            <div className="boxTitle">{myItems[index + 1].name}</div>
                            <div className="boxFooter">
                                <div className="boxDescription">{Number(myItems[index + 1].cost)} $TTPSC</div>
                            </div>
                          </div>
                        )}
                        {this.state.products[index + 2] && (
                          <div
                            className="box"
                            key={index + 2}
                            data-index={index + 2}
                          >
                            <div className="boxTitle">{myItems[index + 2].name}</div>
                            <div className="boxFooter">
                                <div className="boxDescription">{Number(myItems[index + 2].cost)} $TTPSC</div>
                            </div>
                          </div>
                          
                        )}
                      </div>
                    );
                  }
                })
              )}
            </div>
            </div>
        </div>
    )
}