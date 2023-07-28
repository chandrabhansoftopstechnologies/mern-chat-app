import ChatPageContrller from "./ChatPageContrller";
import "./ChatPage.css";
import { withRouter } from "../../HOC";
export class ChatPage extends ChatPageContrller {
  
  render() {
    return <div className="chatpage"></div>;
  }
}

export default withRouter(ChatPage);
