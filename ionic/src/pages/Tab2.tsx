import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Itemlist from '../components/Browse/Itemlist';
import Maps from '../components/Browse/Maps';
import ExploreContainer from '../components/ExploreContainer';
import FoodMenu from '../components/Menu/FoodMenu';

const Tab2: React.FC = () => {


  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <Maps/> */}
        <Itemlist/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
