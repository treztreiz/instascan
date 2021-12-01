<?php

namespace App\Controller;

use App\Form\GeneratorType;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="main")
     */
    public function index(): Response
    {
        return $this->render('main/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/generate", name="generate")
     */
    public function generate(Request $request): Response
    {   
        $form = $this->createForm(GeneratorType::class);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) { 

            $options = new QROptions([
                'version'    => 5,
                'outputType' => QRCode::OUTPUT_MARKUP_SVG,
                'eccLevel'   => QRCode::ECC_L,
            ]);
            
            $qrCode = (new QRCode($options))->render($form->get('text')->getData());

            return $this->render('main/generated.html.twig', [
                'qrCode' => $qrCode
            ]);
        }

        return $this->render('main/generate.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
