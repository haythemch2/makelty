import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Cart from '../components/Cart/Cart';
import ExploreContainer from '../components/ExploreContainer';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Cart/>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
