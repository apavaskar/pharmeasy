import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {mappedChemistListSelector} from '../../redux/selectors/doctorChemistListSelectors';
import SquerVStack from '../../widgets/SquerContainer/SquerVStack';
import SquerText from '../../widgets/SquerFormField/SquerText';
import {
  addChemistStatusStartAction,
  changeChemistStatusStartAction,
  initChemistsForDoctorStartAction,
  removeChemistStatusStartAction,
} from '../../redux/actions/doctorChemist/doctorListAction';
import {FlatList, View} from 'native-base';
import SquerHStack from '../../widgets/SquerContainer/SquerHStack';
import SquerFlatListSeparator from '../../widgets/SquerContainer/SquerListSeparator';
import {SquerCheckbox} from '../../widgets/SquerFormField';
import {SquerButton} from '../../widgets/SquerButton';
import {SquerDivider} from '../../widgets/SquerDivider';
import {certificateSelector} from '../../selectors/authSelector';

const ChemistMappingComponent = props => {
  useEffect(() => {
    props.handleInitChemistList({doctorId: props.route.params.doctorId});
  }, [props.route.params.doctorId]);

  return (
    <SquerVStack>
      <SquerText type={'sub-heading'}>
        {props.route.params.doctorName}
      </SquerText>
      <SquerDivider />
      <FlatList
        data={props.mappedChemists}
        renderItem={item => (
          <ChemistRow
            chemist={item.item}
            rowPressed={(status, chemistId) => {
              if (status === false) {
                props.handleRemoveChemist({
                  status: status,
                  chemistId: chemistId,
                  doctorId: props.route.params.doctorId,
                  certificate: props.certificate,
                });
              } else {
                props.handleAddChemist({
                  status: status,
                  chemistId: chemistId,
                  doctorId: props.route.params.doctorId,
                  certificate: props.certificate,
                });
              }
            }}
          />
        )}
        ItemSeparatorComponent={SquerFlatListSeparator}
      />
    </SquerVStack>
  );
};

const ChemistRow = props => {
  return (
    <SquerHStack style={{padding: 10, justifyContent: 'space-between'}}>
      <SquerText type={'label'}>{props.chemist.name}</SquerText>
      <SquerCheckbox
        selected={props.chemist.mapped}
        onPress={() =>
          props.rowPressed(
            props.chemist.mapped ? false : true,
            props.chemist.id,
          )
        }
      />
    </SquerHStack>
  );
};

const mapState = state => {
  const mappedChemists = mappedChemistListSelector(state);
  const certificate = certificateSelector(state);
  return {mappedChemists, certificate};
};

const actions = {
  handleInitChemistList: initChemistsForDoctorStartAction,
  handleRemoveChemist: removeChemistStatusStartAction,
  handleAddChemist: addChemistStatusStartAction,
};

export default connect(mapState, actions)(ChemistMappingComponent);
