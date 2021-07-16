import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Auth from '../components/Auth/Auth';
import ExploreContainer from '../components/ExploreContainer';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Authentication</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Authentication</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <Auth/>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
