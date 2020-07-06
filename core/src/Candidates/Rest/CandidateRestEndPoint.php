<?php
namespace Candidates\Rest;

use Candidates\Common\Model\Candidate;
use Classes\BaseService;
use Classes\IceResponse;
use Classes\RestEndPoint;

class CandidateRestEndPoint extends RestEndPoint
{
    public function get($parameter)
    {
        if (empty($parameter)) {
            return new IceResponse(IceResponse::ERROR, "ID not provided");
        }

        $candidate = new Candidate();
        $candidate->Load("id = ?", array($parameter));

        if (!empty($candidate->id)) {
            $candidate = BaseService::getInstance()->cleanUpAdoDB($candidate);
            $candidate = $this->clearCandidateObject($candidate);
            $candidate = $this->cleanObject($candidate);
            return new IceResponse(IceResponse::SUCCESS, $candidate);
        }

        return new IceResponse(IceResponse::ERROR, "Candidate not found");
    }

    private function clearCandidateObject($candidate)
    {
        unset($candidate->htmlCVData);
        return $candidate;
    }
}
