import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUserId } from "../../app/slices/order";
import { format, parseISO } from "date-fns";

const Order = () => {
  const user = useSelector((state) => state.users.user);
  const orders = useSelector((state) => state.orders.orders);
  let sortedOrders = orders ? [...orders] : null;
  if (sortedOrders) sortedOrders.reverse();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersByUserId({ userId: user.id }));
  }, [dispatch, user.id]);

  return (
    <>
      <div className="myaccount-content">
        <h4 className="title">Siparişlerim </h4>
        <div className="table_page table-responsive">
          <table>
            <thead>
              <tr>
                <th>Sipariş No</th>
                <th>Tarih</th>
                <th>Ürün Sayısı</th>
                <th>Toplam</th>
                <th>Durum</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {sortedOrders &&
                sortedOrders.map((order) => (
                  <tr>
                    <td>#{order.id}</td>
                    <td>{format(parseISO(order.orderTime), "dd/MM/yyyy HH:mm")}</td>
                    <td>{order.cartTotalItems}</td>
                    <td>{order.orderTotal.toFixed(2)} TL </td>
                    <td>
                      {order.paymentStatus ? (
                        <span className="badge badge-info">Tamamlandı</span>
                      ) : (
                        <span className="badge badge-warning">Ödeme bekleniyor</span>
                      )}
                    </td>
                    {/* <td>
                      <Link to="/order-success" className="view">
                        Görüntüle
                      </Link>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Order;
