import ImportLeadUseCase from './ImportLeadUseCase';
import CreateLeadSourcesUseCase from './sources/CreateLeadSourcesUseCase';
import UpdateLeadSourcesUseCase from './sources/UpdateLeadSourcesUseCase';
import CreateCommentUseCase from './comment/CreateCommentUseCase';
import GetCommentUseCase from './comment/GetCommentUseCase';
import CreateLeadSourcesScoreUseCase from './sources/CreateLeadSourcesScoreUseCase';
import GetLeadSourcesUseCase from './sources/GetLeadSourcesUseCase';
import CreateRejectionUseCase from './detail/CreateRejectionUseCase';
import GetLeadSourceScoreUseCase from './sources/GetLeadSourceScoreUseCase';
import UpdateLeadSourceScoreUseCase from './sources/UpdateLeadSourceScoreUseCase';
import GetImportLeadsUseCase from './import/GetImportLeadUseCase';
import GetLeadParticipantUseCase from './lead-reject-participant/GetLeadParticipantUseCase';
import GetLeadRecordingUseCase from './lead-reject-recording/GetLeadRecordingUseCase';
import CreateDocumentLeadUseCase from './create-document';
import DeleteDocumentLeadUseCase from './delete-document';
import GetListDocumentUploadedLeadUseCase from './list-document';

export default {
  GetCommentUseCase,
  CreateCommentUseCase,
  ImportLeadUseCase,
  CreateLeadSourcesUseCase,
  UpdateLeadSourcesUseCase,
  CreateLeadSourcesScoreUseCase,
  GetLeadSourcesUseCase,
  CreateRejectionUseCase,
  GetLeadSourceScoreUseCase,
  UpdateLeadSourceScoreUseCase,
  GetImportLeadsUseCase,
  GetLeadParticipantUseCase,
  GetLeadRecordingUseCase,
  CreateDocumentLeadUseCase,
  DeleteDocumentLeadUseCase,
  GetListDocumentUploadedLeadUseCase,
};
