import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  Mic,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Turtle,
  Sparkles,
  Flame,
  Check,
  Compass,
  Layers,
  ChevronRight,
  Info,
  Award,
  History,
  TrendingUp,
  Brain,
  Link2,
  HelpCircle,
  BookOpen,
  Timer,
  Play,
  Pause,
  Calendar,
  Bell,
  Coffee
} from 'lucide-react';

// ============================================================================
// DICIONÁRIO COMPLETO DE CONJUGAÇÕES EM PORTUGUÊS DO BRASIL (PT-BR FALADO)
// Garante que nenhuma frase fique no infinitivo ("Eu não estudar" -> "Eu não estudo")
// ============================================================================
const PT_CONJUGATIONS = {
  study: {
    ptInf: 'estudar',
    ptPres1s: 'estudo',
    ptPres2s: 'estuda',
    ptPast1s: 'estudei',
    ptPast2s: 'estudou',
    ptFut1s: 'vou estudar',
    ptFut2s: 'vai estudar'
  },
  help: {
    ptInf: 'ajudar',
    ptPres1s: 'ajudo',
    ptPres2s: 'ajuda',
    ptPast1s: 'ajudei',
    ptPast2s: 'ajudou',
    ptFut1s: 'vou ajudar',
    ptFut2s: 'vai ajudar'
  },
  work: {
    ptInf: 'trabalhar',
    ptPres1s: 'trabalho',
    ptPres2s: 'trabalha',
    ptPast1s: 'trabalhei',
    ptPast2s: 'trabalhou',
    ptFut1s: 'vou trabalhar',
    ptFut2s: 'vai trabalhar'
  },
  play: {
    ptInf: 'jogar',
    ptPres1s: 'jogo',
    ptPres2s: 'joga',
    ptPast1s: 'joguei',
    ptPast2s: 'jogou',
    ptFut1s: 'vou jogar',
    ptFut2s: 'vai jogar'
  },
  travel: {
    ptInf: 'viajar',
    ptPres1s: 'viajo',
    ptPres2s: 'viaja',
    ptPast1s: 'viajei',
    ptPast2s: 'viajou',
    ptFut1s: 'vou viajar',
    ptFut2s: 'vai viajar'
  },
  cook: {
    ptInf: 'cozinhar',
    ptPres1s: 'cozinho',
    ptPres2s: 'cozinha',
    ptPast1s: 'cozinhei',
    ptPast2s: 'cozinhou',
    ptFut1s: 'vou cozinhar',
    ptFut2s: 'vai cozinhar'
  },
  like: {
    ptInf: 'gostar',
    ptPres1s: 'gosto',
    ptPres2s: 'gosta',
    ptPast1s: 'gostei',
    ptPast2s: 'gostou',
    ptFut1s: 'vou gostar',
    ptFut2s: 'vai gostar'
  },
  need: {
    ptInf: 'precisar',
    ptPres1s: 'preciso',
    ptPres2s: 'precisa',
    ptPast1s: 'precisei',
    ptPast2s: 'precisou',
    ptFut1s: 'vou precisar',
    ptFut2s: 'vai precisar'
  },
  want: {
    ptInf: 'querer',
    ptPres1s: 'quero',
    ptPres2s: 'quer',
    ptPast1s: 'quis',
    ptPast2s: 'quis',
    ptFut1s: 'vou querer',
    ptFut2s: 'vai querer'
  },
  call: {
    ptInf: 'ligar',
    ptPres1s: 'ligo',
    ptPres2s: 'liga',
    ptPast1s: 'liguei',
    ptPast2s: 'ligou',
    ptFut1s: 'vou ligar',
    ptFut2s: 'vai ligar'
  },
  listen: {
    ptInf: 'escutar',
    ptPres1s: 'escuto',
    ptPres2s: 'escuta',
    ptPast1s: 'escutei',
    ptPast2s: 'escutou',
    ptFut1s: 'vou escutar',
    ptFut2s: 'vai escutar'
  },
  watch: {
    ptInf: 'assistir',
    ptPres1s: 'assisto',
    ptPres2s: 'assiste',
    ptPast1s: 'assisti',
    ptPast2s: 'assistiu',
    ptFut1s: 'vou assistir',
    ptFut2s: 'vai assistir'
  },
  understand: {
    ptInf: 'entender',
    ptPres1s: 'entendo',
    ptPres2s: 'entende',
    ptPast1s: 'entendi',
    ptPast2s: 'entendeu',
    ptFut1s: 'vou entender',
    ptFut2s: 'vai entender'
  },
  buy: {
    ptInf: 'comprar',
    ptPres1s: 'compro',
    ptPres2s: 'compra',
    ptPast1s: 'comprei',
    ptPast2s: 'comprou',
    ptFut1s: 'vou comprar',
    ptFut2s: 'vai comprar'
  },
  speak: {
    ptInf: 'falar',
    ptPres1s: 'falo',
    ptPres2s: 'fala',
    ptPast1s: 'falei',
    ptPast2s: 'falou',
    ptFut1s: 'vou falar',
    ptFut2s: 'vai falar'
  },
  make: {
    ptInf: 'fazer',
    ptPres1s: 'faço',
    ptPres2s: 'faz',
    ptPast1s: 'fiz',
    ptPast2s: 'fez',
    ptFut1s: 'vou fazer',
    ptFut2s: 'vai fazer'
  },
  take: {
    ptInf: 'levar',
    ptPres1s: 'levo',
    ptPres2s: 'leva',
    ptPast1s: 'levei',
    ptPast2s: 'levou',
    ptFut1s: 'vou levar',
    ptFut2s: 'vai levar'
  },
  meet: {
    ptInf: 'encontrar',
    ptPres1s: 'encontro',
    ptPres2s: 'encontra',
    ptPast1s: 'encontrei',
    ptPast2s: 'encontrou',
    ptFut1s: 'vou encontrar',
    ptFut2s: 'vai encontrar'
  },
  choose: {
    ptInf: 'escolher',
    ptPres1s: 'escolho',
    ptPres2s: 'escolhe',
    ptPast1s: 'escolhi',
    ptPast2s: 'escolheu',
    ptFut1s: 'vou escolher',
    ptFut2s: 'vai escolher'
  },
  bring: {
    ptInf: 'trazer',
    ptPres1s: 'trago',
    ptPres2s: 'traz',
    ptPast1s: 'trouxe',
    ptPast2s: 'trouxe',
    ptFut1s: 'vou trazer',
    ptFut2s: 'vai trazer'
  },
  achieve: {
    ptInf: 'alcançar',
    ptPres1s: 'alcanço',
    ptPres2s: 'alcança',
    ptPast1s: 'alcancei',
    ptPast2s: 'alcançou',
    ptFut1s: 'vou alcançar',
    ptFut2s: 'vai alcançar'
  },
  improve: {
    ptInf: 'melhorar',
    ptPres1s: 'melhoro',
    ptPres2s: 'melhora',
    ptPast1s: 'melhorei',
    ptPast2s: 'melhorou',
    ptFut1s: 'vou melhorar',
    ptFut2s: 'vai melhorar'
  },
  manage: {
    ptInf: 'gerenciar',
    ptPres1s: 'gerencio',
    ptPres2s: 'gerencia',
    ptPast1s: 'gerenciei',
    ptPast2s: 'gerenciou',
    ptFut1s: 'vou gerenciar',
    ptFut2s: 'vai gerenciar'
  },
  figure_out: {
    ptInf: 'resolver',
    ptPres1s: 'resolvo',
    ptPres2s: 'resolve',
    ptPast1s: 'resolvi',
    ptPast2s: 'resolveu',
    ptFut1s: 'vou resolver',
    ptFut2s: 'vai resolver'
  },
  carry_out: {
    ptInf: 'executar',
    ptPres1s: 'executo',
    ptPres2s: 'executa',
    ptPast1s: 'executei',
    ptPast2s: 'executou',
    ptFut1s: 'vou executar',
    ptFut2s: 'vai executar'
  },
  negotiate: {
    ptInf: 'negociar',
    ptPres1s: 'negocio',
    ptPres2s: 'negocia',
    ptPast1s: 'negociei',
    ptPast2s: 'negociou',
    ptFut1s: 'vou negociar',
    ptFut2s: 'vai negociar'
  },
  deal_with: {
    ptInf: 'lidar com isso',
    ptPres1s: 'lido com isso',
    ptPres2s: 'lida com isso',
    ptPast1s: 'lidei com isso',
    ptPast2s: 'lidou com isso',
    ptFut1s: 'vou lidar com isso',
    ptFut2s: 'vai lidar com isso'
  }
};

function getVerbPt(verb) {
  return (
    PT_CONJUGATIONS[verb.id] || {
      ptInf: verb.pt.toLowerCase(),
      ptPres1s: verb.pt.toLowerCase(),
      ptPres2s: verb.pt.toLowerCase(),
      ptPast1s: verb.pt.toLowerCase(),
      ptPast2s: verb.pt.toLowerCase(),
      ptFut1s: `vou ${verb.pt.toLowerCase()}`,
      ptFut2s: `vai ${verb.pt.toLowerCase()}`
    }
  );
}

// ============================================================================
// CURRÍCULO COMPLETO: NÍVEL BÁSICO, INTERMEDIÁRIO E AVANÇADO
// ============================================================================
const CURRICULUM = [
  {
    levelId: 'basic',
    levelName: 'Nível 1: Básico (Fundação)',
    targetHours: '0h - 150h',
    description: 'Verbos essenciais do dia a dia, estruturas diretas e conectores fundamentais.',
    verbs: [
      {
        id: 'study',
        base: 'study',
        pt: 'Estudar',
        past: 'studied',
        phonetics: {
          presAff: 'ái istâri',
          presNeg: 'ái dôunt istâri',
          presInt: 'dú iú istâri',
          pastAff: 'ái istârid',
          pastNeg: 'ái dídent istâri',
          pastInt: 'díd iú istâri',
          futAff: 'áil istâri',
          futNeg: 'ái uôunt istâri',
          futInt: 'uíl iú istâri'
        }
      },
      {
        id: 'help',
        base: 'help',
        pt: 'Ajudar',
        past: 'helped',
        phonetics: {
          presAff: 'ái réup',
          presNeg: 'ái dôunt réup',
          presInt: 'dú iú réup',
          pastAff: 'ái réupt',
          pastNeg: 'ái dídent réup',
          pastInt: 'díd iú réup',
          futAff: 'áil réup',
          futNeg: 'ái uôunt réup',
          futInt: 'uíl iú réup'
        }
      },
      {
        id: 'work',
        base: 'work',
        pt: 'Trabalhar',
        past: 'worked',
        phonetics: {
          presAff: 'ái uôrk',
          presNeg: 'ái dôunt uôrk',
          presInt: 'dú iú uôrk',
          pastAff: 'ái uôrkt',
          pastNeg: 'ái dídent uôrk',
          pastInt: 'díd iú uôrk',
          futAff: 'áil uôrk',
          futNeg: 'ái uôunt uôrk',
          futInt: 'uíl iú uôrk'
        }
      },
      {
        id: 'play',
        base: 'play',
        pt: 'Jogar / Praticar',
        past: 'played',
        phonetics: {
          presAff: 'ái plêi',
          presNeg: 'ái dôunt plêi',
          presInt: 'dú iú plêi',
          pastAff: 'ái plêid',
          pastNeg: 'ái dídent plêi',
          pastInt: 'díd iú plêi',
          futAff: 'áil plêi',
          futNeg: 'ái uôunt plêi',
          futInt: 'uíl iú plêi'
        }
      },
      {
        id: 'travel',
        base: 'travel',
        pt: 'Viajar',
        past: 'traveled',
        phonetics: {
          presAff: 'ái trével',
          presNeg: 'ái dôunt trével',
          presInt: 'dú iú trével',
          pastAff: 'ái tréveld',
          pastNeg: 'ái dídent trével',
          pastInt: 'díd iú trével',
          futAff: 'áil trével',
          futNeg: 'ái uôunt trével',
          futInt: 'uíl iú trével'
        }
      },
      {
        id: 'cook',
        base: 'cook',
        pt: 'Cozinhar',
        past: 'cooked',
        phonetics: {
          presAff: 'ái cúk',
          presNeg: 'ái dôunt cúk',
          presInt: 'dú iú cúk',
          pastAff: 'ái cúkt',
          pastNeg: 'ái dídent cúk',
          pastInt: 'díd iú cúk',
          futAff: 'áil cúk',
          futNeg: 'ái uôunt cúk',
          futInt: 'uíl iú cúk'
        }
      },
      {
        id: 'like',
        base: 'like',
        pt: 'Gostar',
        past: 'liked',
        phonetics: {
          presAff: 'ái láik',
          presNeg: 'ái dôunt láik',
          presInt: 'dú iú láik',
          pastAff: 'ái láikt',
          pastNeg: 'ái dídent láik',
          pastInt: 'díd iú láik',
          futAff: 'áil láik',
          futNeg: 'ái uôunt láik',
          futInt: 'uíl iú láik'
        }
      },
      {
        id: 'need',
        base: 'need',
        pt: 'Precisar',
        past: 'needed',
        phonetics: {
          presAff: 'ái níd',
          presNeg: 'ái dôunt níd',
          presInt: 'dú iú níd',
          pastAff: 'ái nídid',
          pastNeg: 'ái dídent níd',
          pastInt: 'díd iú níd',
          futAff: 'áil níd',
          futNeg: 'ái uôunt níd',
          futInt: 'uíl iú níd'
        }
      },
      {
        id: 'want',
        base: 'want',
        pt: 'Querer',
        past: 'wanted',
        phonetics: {
          presAff: 'ái uônt',
          presNeg: 'ái dôunt uônt',
          presInt: 'dú iú uônt',
          pastAff: 'ái uôntid',
          pastNeg: 'ái dídent uônt',
          pastInt: 'díd iú uônt',
          futAff: 'áil uônt',
          futNeg: 'ái uôunt uônt',
          futInt: 'uíl iú uônt'
        }
      },
      {
        id: 'call',
        base: 'call',
        pt: 'Ligar / Chamar',
        past: 'called',
        phonetics: {
          presAff: 'ái cóu',
          presNeg: 'ái dôunt cóu',
          presInt: 'dú iú cóu',
          pastAff: 'ái cóud',
          pastNeg: 'ái dídent cóu',
          pastInt: 'díd iú cóu',
          futAff: 'áil cóu',
          futNeg: 'ái uôunt cóu',
          futInt: 'uíl iú cóu'
        }
      },
      {
        id: 'listen',
        base: 'listen',
        pt: 'Ouvir / Escutar',
        past: 'listened',
        phonetics: {
          presAff: 'ái lísen',
          presNeg: 'ái dôunt lísen',
          presInt: 'dú iú lísen',
          pastAff: 'ái lísend',
          pastNeg: 'ái dídent lísen',
          pastInt: 'díd iú lísen',
          futAff: 'áil lísen',
          futNeg: 'ái uôunt lísen',
          futInt: 'uíl iú lísen'
        }
      },
      {
        id: 'watch',
        base: 'watch',
        pt: 'Assistir',
        past: 'watched',
        phonetics: {
          presAff: 'ái uótch',
          presNeg: 'ái dôunt uótch',
          presInt: 'dú iú uótch',
          pastAff: 'ái uótcht',
          pastNeg: 'ái dídent uótch',
          pastInt: 'díd iú uótch',
          futAff: 'áil uótch',
          futNeg: 'ái uôunt uótch',
          futInt: 'uíl iú uótch'
        }
      }
    ]
  },
  {
    levelId: 'intermediate',
    levelName: 'Nível 2: Intermediário (Expansão)',
    targetHours: '150h - 350h',
    description: 'Verbos irregulares de uso diário, justificativas e tomada de decisões.',
    verbs: [
      {
        id: 'understand',
        base: 'understand',
        pt: 'Entender / Compreender',
        past: 'understood',
        phonetics: {
          presAff: 'ái ânderstênd',
          presNeg: 'ái dôunt ânderstênd',
          presInt: 'dú iú ânderstênd',
          pastAff: 'ái ânderstúd',
          pastNeg: 'ái dídent ânderstênd',
          pastInt: 'díd iú ânderstênd',
          futAff: 'áil ânderstênd',
          futNeg: 'ái uôunt ânderstênd',
          futInt: 'uíl iú ânderstênd'
        }
      },
      {
        id: 'buy',
        base: 'buy',
        pt: 'Comprar',
        past: 'bought',
        phonetics: {
          presAff: 'ái bái',
          presNeg: 'ái dôunt bái',
          presInt: 'dú iú bái',
          pastAff: 'ái bót',
          pastNeg: 'ái dídent bái',
          pastInt: 'díd iú bái',
          futAff: 'áil bái',
          futNeg: 'ái uôunt bái',
          futInt: 'uíl iú bái'
        }
      },
      {
        id: 'speak',
        base: 'speak',
        pt: 'Falar',
        past: 'spoke',
        phonetics: {
          presAff: 'ái ispík',
          presNeg: 'ái dôunt ispík',
          presInt: 'dú iú ispík',
          pastAff: 'ái ispôuk',
          pastNeg: 'ái dídent ispík',
          pastInt: 'díd iú ispík',
          futAff: 'áil ispík',
          futNeg: 'ái uôunt ispík',
          futInt: 'uíl iú ispík'
        }
      },
      {
        id: 'make',
        base: 'make',
        pt: 'Fazer / Criar',
        past: 'made',
        phonetics: {
          presAff: 'ái mêik',
          presNeg: 'ái dôunt mêik',
          presInt: 'dú iú mêik',
          pastAff: 'ái mêid',
          pastNeg: 'ái dídent mêik',
          pastInt: 'díd iú mêik',
          futAff: 'áil mêik',
          futNeg: 'ái uôunt mêik',
          futInt: 'uíl iú mêik'
        }
      },
      {
        id: 'take',
        base: 'take',
        pt: 'Levar / Tomar',
        past: 'took',
        phonetics: {
          presAff: 'ái têik',
          presNeg: 'ái dôunt têik',
          presInt: 'dú iú têik',
          pastAff: 'ái túk',
          pastNeg: 'ái dídent têik',
          pastInt: 'díd iú têik',
          futAff: 'áil têik',
          futNeg: 'ái uôunt têik',
          futInt: 'uíl iú têik'
        }
      },
      {
        id: 'meet',
        base: 'meet',
        pt: 'Encontrar / Conhecer',
        past: 'met',
        phonetics: {
          presAff: 'ái mít',
          presNeg: 'ái dôunt mít',
          presInt: 'dú iú mít',
          pastAff: 'ái mét',
          pastNeg: 'ái dídent mít',
          pastInt: 'díd iú mít',
          futAff: 'áil mít',
          futNeg: 'ái uôunt mít',
          futInt: 'uíl iú mít'
        }
      },
      {
        id: 'choose',
        base: 'choose',
        pt: 'Escolher',
        past: 'chose',
        phonetics: {
          presAff: 'ái tchúz',
          presNeg: 'ái dôunt tchúz',
          presInt: 'dú iú tchúz',
          pastAff: 'ái tchôuz',
          pastNeg: 'ái dídent tchúz',
          pastInt: 'díd iú tchúz',
          futAff: 'áil tchúz',
          futNeg: 'ái uôunt tchúz',
          futInt: 'uíl iú tchúz'
        }
      },
      {
        id: 'bring',
        base: 'bring',
        pt: 'Trazer',
        past: 'brought',
        phonetics: {
          presAff: 'ái bríng',
          presNeg: 'ái dôunt bríng',
          presInt: 'dú iú bríng',
          pastAff: 'ái brót',
          pastNeg: 'ái dídent bríng',
          pastInt: 'díd iú bríng',
          futAff: 'áil bríng',
          futNeg: 'ái uôunt bríng',
          futInt: 'uíl iú bríng'
        }
      }
    ]
  },
  {
    levelId: 'advanced',
    levelName: 'Nível 3: Avançado (Fluência & Nuances)',
    targetHours: '350h - 500h',
    description: 'Negociação, resolução de problemas e phrasal verbs corporativos.',
    verbs: [
      {
        id: 'achieve',
        base: 'achieve',
        pt: 'Alcançar / Conquistar',
        past: 'achieved',
        phonetics: {
          presAff: 'ái atchív',
          presNeg: 'ái dôunt atchív',
          presInt: 'dú iú atchív',
          pastAff: 'ái atchívd',
          pastNeg: 'ái dídent atchív',
          pastInt: 'díd iú atchív',
          futAff: 'áil atchív',
          futNeg: 'ái uôunt atchív',
          futInt: 'uíl iú atchív'
        }
      },
      {
        id: 'improve',
        base: 'improve',
        pt: 'Melhorar / Aprimorar',
        past: 'improved',
        phonetics: {
          presAff: 'ái imprúv',
          presNeg: 'ái dôunt imprúv',
          presInt: 'dú iú imprúv',
          pastAff: 'ái imprúvd',
          pastNeg: 'ái dídent imprúv',
          pastInt: 'díd iú imprúv',
          futAff: 'áil imprúv',
          futNeg: 'ái uôunt imprúv',
          futInt: 'uíl iú imprúv'
        }
      },
      {
        id: 'manage',
        base: 'manage',
        pt: 'Gerenciar / Conseguir',
        past: 'managed',
        phonetics: {
          presAff: 'ái ménidj',
          presNeg: 'ái dôunt ménidj',
          presInt: 'dú iú ménidj',
          pastAff: 'ái ménidjd',
          pastNeg: 'ái dídent ménidj',
          pastInt: 'díd iú ménidj',
          futAff: 'áil ménidj',
          futNeg: 'ái uôunt ménidj',
          futInt: 'uíl iú ménidj'
        }
      },
      {
        id: 'figure_out',
        base: 'figure out',
        pt: 'Descobrir / Resolver',
        past: 'figured out',
        phonetics: {
          presAff: 'ái fíguer áut',
          presNeg: 'ái dôunt fíguer áut',
          presInt: 'dú iú fíguer áut',
          pastAff: 'ái fíguerd áut',
          pastNeg: 'ái dídent fíguer áut',
          pastInt: 'díd iú fíguer áut',
          futAff: 'áil fíguer áut',
          futNeg: 'ái uôunt fíguer áut',
          futInt: 'uíl iú fíguer áut'
        }
      },
      {
        id: 'carry_out',
        base: 'carry out',
        pt: 'Executar / Realizar',
        past: 'carried out',
        phonetics: {
          presAff: 'ái kéri áut',
          presNeg: 'ái dôunt kéri áut',
          presInt: 'dú iú kéri áut',
          pastAff: 'ái kérid áut',
          pastNeg: 'ái dídent kéri áut',
          pastInt: 'díd iú kéri áut',
          futAff: 'áil kéri áut',
          futNeg: 'ái uôunt kéri áut',
          futInt: 'uíl iú kéri áut'
        }
      },
      {
        id: 'negotiate',
        base: 'negotiate',
        pt: 'Negociar',
        past: 'negotiated',
        phonetics: {
          presAff: 'ái nigôushieit',
          presNeg: 'ái dôunt nigôushieit',
          presInt: 'dú iú nigôushieit',
          pastAff: 'ái nigôushieitid',
          pastNeg: 'ái dídent nigôushieit',
          pastInt: 'díd iú nigôushieit',
          futAff: 'áil nigôushieit',
          futNeg: 'ái uôunt nigôushieit',
          futInt: 'uíl iú nigôushieit'
        }
      },
      {
        id: 'deal_with',
        base: 'deal with',
        pt: 'Lidar com',
        past: 'dealt with',
        phonetics: {
          presAff: 'ái díu uíd',
          presNeg: 'ái dôunt díu uíd',
          presInt: 'dú iú díu uíd',
          pastAff: 'ái déut uíd',
          pastNeg: 'ái dídent díu uíd',
          pastInt: 'díd iú díu uíd',
          futAff: 'áil díu uíd',
          futNeg: 'ái uôunt díu uíd',
          futInt: 'uíl iú díu uíd'
        }
      }
    ]
  }
];

// LISTA EXPANDIDA DE CONJUNÇÕES
const CONJUNCTIONS_LIST = [
  { en: 'because', pt: 'porque (motivo)' },
  { en: 'but', pt: 'mas / porém (contraste)' },
  { en: 'so', pt: 'então / por isso (resultado)' },
  { en: 'when', pt: 'quando (tempo)' },
  { en: 'if', pt: 'se (condição)' },
  { en: 'although', pt: 'embora / apesar de' },
  { en: 'while', pt: 'enquanto (concomitância)' },
  { en: "that's why", pt: 'é por isso que' },
  { en: 'besides', pt: 'além disso / além de' }
];

// As 10 Rodadas Sequenciais Obrigatórias para CADA verbo
const ROUND_TEMPLATES = [
  { step: 1, tense: 'PRESENTE', form: 'AFIRMATIVA (+)', key: 'presAff' },
  { step: 2, tense: 'PRESENTE', form: 'NEGATIVA (-)', key: 'presNeg' },
  { step: 3, tense: 'PRESENTE', form: 'INTERROGATIVA (?)', key: 'presInt' },
  { step: 4, tense: 'PASSADO', form: 'AFIRMATIVA (+)', key: 'pastAff' },
  { step: 5, tense: 'PASSADO', form: 'NEGATIVA (-)', key: 'pastNeg' },
  { step: 6, tense: 'PASSADO', form: 'INTERROGATIVA (?)', key: 'pastInt' },
  { step: 7, tense: 'FUTURO', form: 'AFIRMATIVA (+)', key: 'futAff' },
  { step: 8, tense: 'FUTURO', form: 'NEGATIVA (-)', key: 'futNeg' },
  { step: 9, tense: 'FUTURO', form: 'INTERROGATIVA (?)', key: 'futInt' },
  { step: 10, tense: 'COSTURA ESPIRAL', form: 'CONJUNÇÃO (Zero Esquecimento)', key: 'spiral' }
];

const TIME_MARKERS = [
  { id: 'none', label: 'Sem Marcador', en: '' },
  { id: 'everyday', label: 'Every day', en: 'every day' },
  { id: 'today', label: 'Today', en: 'today' },
  { id: 'yesterday', label: 'Yesterday', en: 'yesterday' },
  { id: 'tomorrow', label: 'Tomorrow', en: 'tomorrow' }
];

// Gerador dinâmico do desafio para o verbo e rodada atual (garante costura com verbos anteriores)
function buildChallengeData(verb, roundIdx, previousVerbs = []) {
  const tpl = ROUND_TEMPLATES[roundIdx] || ROUND_TEMPLATES[0];
  const b = verb.base;
  const p = verb.past;
  const conj = getVerbPt(verb);

  switch (tpl.key) {
    case 'presAff':
      return {
        ...tpl,
        pt: `Eu ${conj.ptPres1s}`,
        en: `I ${b}`,
        phonetic: verb.phonetics?.presAff || `Ái ${b}`,
        chips: ['I', b],
        distractors: [p, "don't", "didn't", 'will', 'you'],
        rule: `Presente Afirmativo: Sujeito + Verbo normal ("I ${b}" = "Eu ${conj.ptPres1s}").`
      };
    case 'presNeg':
      return {
        ...tpl,
        pt: `Eu não ${conj.ptPres1s}`,
        en: `I don't ${b}`,
        phonetic: verb.phonetics?.presNeg || `Ái dôunt ${b}`,
        chips: ['I', "don't", b],
        distractors: ["didn't", "won't", p, 'not', 'Do'],
        rule: `Presente Negativo: para dizer "Eu não ${conj.ptPres1s}", usamos "don't" antes do verbo ("I don't ${b}").`
      };
    case 'presInt':
      return {
        ...tpl,
        pt: `Você ${conj.ptPres2s}?`,
        en: `Do you ${b}?`,
        phonetic: verb.phonetics?.presInt || `Dú iú ${b}?`,
        chips: ['Do', 'you', `${b}?`],
        distractors: ['Did', 'Will', p, 'Does', 'are'],
        rule: `Pergunta no Presente: para perguntar "Você ${conj.ptPres2s}?", colocamos "Do" no início ("Do you ${b}?").`
      };
    case 'pastAff':
      return {
        ...tpl,
        pt: `Eu ${conj.ptPast1s} ontem`,
        en: `I ${p} yesterday`,
        phonetic: `${verb.phonetics?.pastAff || `Ái ${p}`} iésterdêi`,
        chips: ['I', p, 'yesterday'],
        distractors: [b, "didn't", 'tomorrow', 'was', 'will'],
        rule: `Passado Afirmativo: verbo no passado ("I ${p} yesterday" = "Eu ${conj.ptPast1s} ontem").`
      };
    case 'pastNeg':
      return {
        ...tpl,
        pt: `Eu não ${conj.ptPast1s} ontem`,
        en: `I didn't ${b} yesterday`,
        phonetic: `${verb.phonetics?.pastNeg || `Ái dídent ${b}`} iésterdêi`,
        chips: ['I', "didn't", b, 'yesterday'],
        distractors: [p, "don't", "won't", 'tomorrow', 'did'],
        rule: `Passado Negativo ("Eu não ${conj.ptPast1s}"): usamos "didn't" e o verbo volta para a forma base ("I didn't ${b}").`
      };
    case 'pastInt':
      return {
        ...tpl,
        pt: `Você ${conj.ptPast2s} ontem?`,
        en: `Did you ${b} yesterday?`,
        phonetic: `${verb.phonetics?.pastInt || `Díd iú ${b}`} iésterdêi?`,
        chips: ['Did', 'you', b, 'yesterday?'],
        distractors: ['Do', p, 'Will', 'tomorrow?', 'was'],
        rule: `Pergunta no Passado ("Você ${conj.ptPast2s} ontem?"): começamos com "Did" e mantemos o verbo normal ("Did you ${b}...?").`
      };
    case 'futAff':
      return {
        ...tpl,
        pt: `Eu ${conj.ptFut1s} amanhã`,
        en: `I'll ${b} tomorrow`,
        phonetic: `${verb.phonetics?.futAff || `Áil ${b}`} tchumórou`,
        chips: ["I'll", b, 'tomorrow'],
        distractors: [p, "won't", 'yesterday', 'did', 'to'],
        rule: `Futuro Afirmativo ("Eu ${conj.ptFut1s}"): usamos a contração "I'll" + verbo normal ("I'll ${b} tomorrow").`
      };
    case 'futNeg':
      return {
        ...tpl,
        pt: `Eu não ${conj.ptFut1s} amanhã`,
        en: `I won't ${b} tomorrow`,
        phonetic: `${verb.phonetics?.futNeg || `Ái uôunt ${b}`} tchumórou`,
        chips: ['I', "won't", b, 'tomorrow'],
        distractors: ["didn't", "don't", p, 'not', 'will'],
        rule: `Futuro Negativo ("Eu não ${conj.ptFut1s}"): usamos "won't" antes do verbo ("I won't ${b} tomorrow").`
      };
    case 'futInt':
      return {
        ...tpl,
        pt: `Você ${conj.ptFut2s} amanhã?`,
        en: `Will you ${b} tomorrow?`,
        phonetic: `${verb.phonetics?.futInt || `Uíl iú ${b}`} tchumórou?`,
        chips: ['Will', 'you', b, 'tomorrow?'],
        distractors: ['Do', 'Did', p, 'yesterday?', 'Are'],
        rule: `Pergunta no Futuro ("Você ${conj.ptFut2s} amanhã?"): colocamos "Will" no início + "you" + verbo normal.`
      };
    case 'spiral':
    default: {
      // Pega um verbo estudado anteriormente para costurar com conjunção variada
      const prev =
        previousVerbs.length > 0
          ? previousVerbs[previousVerbs.length - 1]
          : { id: 'work', base: 'work', past: 'worked', pt: 'Trabalhar' };

      const prevConj = getVerbPt(prev);

      // Alterna entre conjunções com conjugação 100% correta em Português do Brasil
      const conjCycle = [
        {
          en: 'because',
          pt: 'porque',
          phraseEn: `I ${b} today because I didn't ${prev.base} yesterday`,
          phrasePt: `Eu ${conj.ptPres1s} hoje porque eu não ${prevConj.ptPast1s} ontem`,
          chips: ['I', b, 'today', 'because', "I didn't", prev.base, 'yesterday']
        },
        {
          en: 'but',
          pt: 'mas',
          phraseEn: `I'll ${b} tomorrow but I didn't ${prev.base} today`,
          phrasePt: `Eu ${conj.ptFut1s} amanhã, mas eu não ${prevConj.ptPast1s} hoje`,
          chips: ["I'll", b, 'tomorrow', 'but', "I didn't", prev.base, 'today']
        },
        {
          en: 'so',
          pt: 'por isso',
          phraseEn: `I ${p} today so I won't ${prev.base} tomorrow`,
          phrasePt: `Eu ${conj.ptPast1s} hoje, por isso eu não ${prevConj.ptFut1s} amanhã`,
          chips: ['I', p, 'today', 'so', "I won't", prev.base, 'tomorrow']
        },
        {
          en: 'when',
          pt: 'quando',
          phraseEn: `I always ${b} when you ${prev.base}`,
          phrasePt: `Eu sempre ${conj.ptPres1s} quando você ${prevConj.ptPres2s}`,
          chips: ['I', 'always', b, 'when', 'you', prev.base]
        }
      ];

      const selectedConj = conjCycle[verb.base.length % conjCycle.length];

      return {
        ...tpl,
        pt: selectedConj.phrasePt,
        en: selectedConj.phraseEn,
        phonetic: `${verb.phonetics?.presAff || `Ái ${b}`} ... [Costura Espiral]`,
        chips: selectedConj.chips,
        distractors: [p, prev.past, 'although', 'while', "that's why", "don't", 'Did'],
        rule: `Costura Espiral: conectamos o verbo de hoje ("${b}") com a conjunção "${selectedConj.en}" (${selectedConj.pt}) e revisamos o verbo "${prev.base}"!`
      };
    }
  }
}

function playTone(type = 'success') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Ignore audio errors
  }
}

export default function App() {
  // PERSISTÊNCIA: Carrega dados do aluno (com migração automática para InglesGoNow)
  const [persistedProgress, setPersistedProgress] = useState(() => {
    try {
      const savedNew = localStorage.getItem('inglesgonow_progress_v1');
      if (savedNew) return JSON.parse(savedNew);
      const savedOld = localStorage.getItem('ingles500h_progress_v2');
      if (savedOld) return JSON.parse(savedOld);
    } catch (e) {
      // Local storage not available
    }
    return {
      activeLevelId: 'basic',
      activeVerbIndex: 0,
      activeRoundIndex: 0,
      completedVerbs: [], // ids de verbos dominados
      hoursAccumulated: 1.5,
      streakDays: 1,
      todaySecondsStudied: 0,
      lastStudyDate: new Date().toISOString().split('T')[0],
      dailyTargetMinutes: 30,
      daysStudiedHistory: [
        { date: 'Hoje', minutes: 0, verbsCount: 0 }
      ],
      historyLog: [
        { date: 'Hoje', action: 'Iniciou a Fase 1 no InglesGoNow' }
      ]
    };
  });

  const {
    activeLevelId,
    activeVerbIndex,
    activeRoundIndex,
    completedVerbs,
    hoursAccumulated,
    streakDays,
    todaySecondsStudied = 0,
    lastStudyDate,
    dailyTargetMinutes = 30,
    daysStudiedHistory = [],
    historyLog
  } = persistedProgress;

  // Cronômetro diário de estudo
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showTimeAlertModal, setShowTimeAlertModal] = useState(false);
  const [hasAlertedToday, setHasAlertedToday] = useState(false);
  const [activeSessionBlock, setActiveSessionBlock] = useState('block2'); // 'block1' (aquecimento), 'block2' (verbo do dia), 'block3' (fala livre)

  // Atualizador do Cronômetro Diário e Persistência
  useEffect(() => {
    let timerId = null;
    if (isTimerRunning) {
      timerId = setInterval(() => {
        setPersistedProgress((prev) => {
          const newSeconds = (prev.todaySecondsStudied || 0) + 1;
          const targetSeconds = (prev.dailyTargetMinutes || 30) * 60;

          // Dispara alerta quando atinge o tempo exato de 30 minutos
          if (newSeconds >= targetSeconds && !hasAlertedToday) {
            setShowTimeAlertModal(true);
            setHasAlertedToday(true);
            playTone('success');
          }

          // Atualiza horas totais estudadas
          const newTotalHours = Number(((prev.hoursAccumulated || 0) + 1 / 3600).toFixed(2));

          const updated = {
            ...prev,
            todaySecondsStudied: newSeconds,
            hoursAccumulated: newTotalHours
          };

          try {
            localStorage.setItem('inglesgonow_progress_v1', JSON.stringify(updated));
          } catch (e) {}

          return updated;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isTimerRunning, hasAlertedToday]);

  // Formatação do tempo MM:SS
  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Seletores e Dados do Nível e Verbo Atual
  const currentLevel = CURRICULUM.find((l) => l.levelId === activeLevelId) || CURRICULUM[0];
  const currentVerb = currentLevel.verbs[activeVerbIndex] || currentLevel.verbs[0];

  // Matriz de tempos verbais (Painel Esquerdo)
  const [matrixVerbId, setMatrixVerbId] = useState(currentVerb.id);
  const [matrixMarkerId, setMatrixMarkerId] = useState('none');
  const activeMatrixVerb = currentLevel.verbs.find((v) => v.id === matrixVerbId) || currentVerb;
  const activeMatrixConj = getVerbPt(activeMatrixVerb);
  const activeMatrixMarker = TIME_MARKERS.find((m) => m.id === matrixMarkerId) || TIME_MARKERS[0];

  // Verbos previamente estudados para alimentar a 'Costura Espiral'
  const studiedPreviousVerbs = useMemo(() => {
    return currentLevel.verbs.slice(0, activeVerbIndex);
  }, [currentLevel, activeVerbIndex]);

  // Desafio Atual Dinâmico
  const challenge = useMemo(() => {
    return buildChallengeData(currentVerb, activeRoundIndex, studiedPreviousVerbs);
  }, [currentVerb, activeRoundIndex, studiedPreviousVerbs]);

  // Gates de Estudo Obrigatório
  const [hasListened, setHasListened] = useState(false);
  const [selectedChips, setSelectedChips] = useState([]);
  const [assemblyValidation, setAssemblyValidation] = useState(null);
  const [isAssemblyCorrect, setIsAssemblyCorrect] = useState(false);

  // Reconhecimento de Voz
  const [isRecording, setIsRecording] = useState(false);
  const [spokenResult, setSpokenResult] = useState(null);
  const [isVoicePassed, setIsVoicePassed] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);

  // Modal de Histórico e Revisão
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Sincroniza matrixVerb quando o verbo do desafio mudar
  useEffect(() => {
    setMatrixVerbId(currentVerb.id);
  }, [currentVerb.id]);

  // Salva no LocalStorage sempre que o progresso mudar
  const saveProgress = (newValues) => {
    setPersistedProgress((prev) => {
      const updated = { ...prev, ...newValues };
      try {
        localStorage.setItem('inglesgonow_progress_v1', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const resetChallengeGates = () => {
    setHasListened(false);
    setSelectedChips([]);
    setAssemblyValidation(null);
    setIsAssemblyCorrect(false);
    setIsRecording(false);
    setSpokenResult(null);
    setIsVoicePassed(false);
  };

  // Preparação de Chips Embaralhados
  const poolChips = useMemo(() => {
    const list = [...challenge.chips, ...challenge.distractors];
    return list
      .map((text, i) => ({
        id: `${text}-${i}`,
        text,
        sort: (text.length * 17 + i * 11 + activeRoundIndex * 23) % 47
      }))
      .sort((a, b) => a.sort - b.sort);
  }, [challenge, activeRoundIndex]);

  // Áudio Nativo via Web Speech API
  const speakText = (text, customSpeed = null) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const speed = customSpeed !== null ? customSpeed : audioSpeed;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = speed;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice =
      voices.find((v) => v.lang.startsWith('en-US') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);
    setHasListened(true);
  };

  // Manipulação de Chips na Frase
  const toggleChip = (chip) => {
    if (isAssemblyCorrect) return;
    setAssemblyValidation(null);
    const exists = selectedChips.some((c) => c.id === chip.id);
    if (exists) {
      setSelectedChips(selectedChips.filter((c) => c.id !== chip.id));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  // Validação Estrita da Frase Montada
  const handleVerifyAssembly = () => {
    const cleanStr = (s) => s.toLowerCase().replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
    const assembledText = cleanStr(selectedChips.map((c) => c.text).join(' '));
    const targetText = cleanStr(challenge.en);

    if (assembledText === targetText) {
      playTone('success');
      setIsAssemblyCorrect(true);
      setAssemblyValidation({
        valid: true,
        message: 'Frase certinha! O tempo verbal e as palavras tão no lugar certo. Agora solta a voz no microfone!'
      });
      speakText(challenge.en, 1.0);
    } else {
      playTone('error');
      setIsAssemblyCorrect(false);
      setAssemblyValidation({
        valid: false,
        message: challenge.rule
      });
    }
  };

  // Treinador de Voz
  const handleStartVoiceTraining = () => {
    if (!isAssemblyCorrect) return;
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setSpokenResult(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
          setIsRecording(false);
          const transcript = event.results[0][0].transcript;
          evaluateSpokenWords(transcript);
        };

        recognition.onerror = () => {
          setIsRecording(false);
          simulateVoiceSuccess();
        };

        recognition.start();
      } catch (err) {
        setIsRecording(false);
        simulateVoiceSuccess();
      }
    } else {
      setTimeout(() => {
        setIsRecording(false);
        simulateVoiceSuccess();
      }, 1200);
    }
  };

  const evaluateSpokenWords = (transcript) => {
    const normalize = (w) => w.toLowerCase().replace(/[^a-z']/g, '');
    const targetWords = challenge.en.split(' ');
    const spokenTokens = transcript.toLowerCase().split(/\s+/).map(normalize);

    let matchCount = 0;
    const wordsAnalysis = targetWords.map((rawWord) => {
      const clean = normalize(rawWord);
      const isMatched = spokenTokens.includes(clean);
      if (isMatched) matchCount++;
      return { word: rawWord, isMatched };
    });

    const score = Math.round((matchCount / targetWords.length) * 100);
    const passed = score >= 50;

    if (passed) {
      playTone('success');
      setIsVoicePassed(true);
    } else {
      playTone('error');
    }

    setSpokenResult({ transcript, score, passed, words: wordsAnalysis });
  };

  const simulateVoiceSuccess = () => {
    const targetWords = challenge.en.split(' ');
    const wordsAnalysis = targetWords.map((rawWord) => ({ word: rawWord, isMatched: true }));
    playTone('success');
    setIsVoicePassed(true);
    setSpokenResult({
      transcript: challenge.en,
      score: 100,
      passed: true,
      words: wordsAnalysis
    });
  };

  // AVANÇO PROGRESSIVO: Rodada -> Próximo Verbo -> Próximo Nível
  const canAdvance = isAssemblyCorrect && isVoicePassed;

  const handleNextStep = () => {
    if (!canAdvance) return;

    const newHours = Number((hoursAccumulated + 0.5).toFixed(1));

    if (activeRoundIndex < ROUND_TEMPLATES.length - 1) {
      // Avança para a próxima rodada do mesmo verbo (ex: Passado ou Pergunta)
      saveProgress({
        activeRoundIndex: activeRoundIndex + 1,
        hoursAccumulated: newHours
      });
      resetChallengeGates();
    } else {
      // Concluiu TODAS as 10 rodadas do verbo atual!
      const verbKey = `${currentLevel.levelId}-${currentVerb.id}`;
      const updatedCompleted = completedVerbs.includes(verbKey)
        ? completedVerbs
        : [...completedVerbs, verbKey];

      const newHistory = [
        {
          date: 'Agora',
          action: `Dominou o verbo "${currentVerb.base.toUpperCase()}" (${currentVerb.pt}) em todos os tempos verbais e costuras!`
        },
        ...historyLog
      ];

      if (activeVerbIndex < currentLevel.verbs.length - 1) {
        // Desbloqueia e passa para o próximo verbo do mesmo nível
        saveProgress({
          activeVerbIndex: activeVerbIndex + 1,
          activeRoundIndex: 0,
          completedVerbs: updatedCompleted,
          hoursAccumulated: newHours + 1.0,
          historyLog: newHistory
        });
        resetChallengeGates();
      } else {
        // Concluiu todos os verbos do nível atual! Desbloqueia próximo nível
        const currentLevelIdx = CURRICULUM.findIndex((l) => l.levelId === activeLevelId);
        if (currentLevelIdx < CURRICULUM.length - 1) {
          const nextLevel = CURRICULUM[currentLevelIdx + 1];
          newHistory.unshift({
            date: 'Agora',
            action: `Parabéns! Você desbloqueou o ${nextLevel.levelName}!`
          });
          saveProgress({
            activeLevelId: nextLevel.levelId,
            activeVerbIndex: 0,
            activeRoundIndex: 0,
            completedVerbs: updatedCompleted,
            hoursAccumulated: newHours + 5.0,
            historyLog: newHistory
          });
          resetChallengeGates();
        } else {
          // Chegou aos 500h
          saveProgress({
            activeRoundIndex: 0,
            completedVerbs: updatedCompleted,
            hoursAccumulated: 500,
            historyLog: newHistory
          });
          resetChallengeGates();
        }
      }
    }
  };

  // Cálculo da porcentagem do nível atual
  const levelProgressPercent = Math.round(
    ((activeVerbIndex * ROUND_TEMPLATES.length + activeRoundIndex) /
      (currentLevel.verbs.length * ROUND_TEMPLATES.length)) *
      100
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased selection:bg-sky-100">
      {/* ======================================================================
          BARRA SUPERIOR MINIMALISTA: NÍVEL, PROGRESSO E HISTÓRICO
         ====================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-2xs">
              <Compass className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 tracking-tight text-base sm:text-lg">
                  InglesGoNow
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  {currentLevel.levelName.split(':')[0]}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Regra: <strong>1 verbo por dia (10 variações)</strong> • Verbo: <strong className="text-slate-900 uppercase font-black">{currentVerb.base}</strong> ({currentVerb.pt})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Cronômetro Diário de 30 minutos com Play/Pause */}
            <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-xl transition-all ${
              todaySecondsStudied >= dailyTargetMinutes * 60
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <Timer className={`w-4 h-4 ${todaySecondsStudied >= dailyTargetMinutes * 60 ? 'text-emerald-600' : 'text-sky-600'}`} />
              <div className="text-xs font-mono font-bold">
                <span>{formatTime(todaySecondsStudied)}</span>
                <span className="text-slate-400 font-sans font-normal"> / {dailyTargetMinutes}m</span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="ml-1 p-1 hover:bg-slate-200/80 rounded-md transition-all cursor-pointer text-slate-600"
                title={isTimerRunning ? 'Pausar cronômetro' : 'Iniciar cronômetro'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>

            {/* Contador de Dias Seguidos (Streak) */}
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{streakDays} {streakDays === 1 ? 'dia' : 'dias'}</span>
            </div>

            {/* Medidor de Horas Totais */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <div className="text-xs">
                <span className="font-extrabold text-slate-900">{hoursAccumulated}h</span>
                <span className="text-slate-400"> / 500h totais</span>
              </div>
            </div>

            {/* Botão de Histórico e Revisão */}
            <button
              onClick={() => setShowHistoryModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
            >
              <History className="w-4 h-4 text-sky-600" />
              <span className="hidden md:inline">Verbos Concluídos ({completedVerbs.length})</span>
            </button>

            {/* Controle de Velocidade */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl p-1 text-xs font-semibold">
              <button
                onClick={() => setAudioSpeed(1.0)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  audioSpeed === 1.0 ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500'
                }`}
              >
                1.0x
              </button>
              <button
                onClick={() => setAudioSpeed(0.75)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  audioSpeed === 0.75 ? 'bg-white text-amber-700 shadow-2xs font-bold' : 'text-slate-500'
                }`}
              >
                <Turtle className="w-3.5 h-3.5" /> 0.75x
              </button>
            </div>
          </div>
        </div>

        {/* Barra de Progresso do Nível Atual */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">{currentLevel.levelName}</span>
            <span>• {levelProgressPercent}% dominado</span>
          </div>
          <div className="w-48 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* ======================================================================
          GUIA DA SESSÃO DIÁRIA DE 30 MINUTOS (OS 3 BLOCOS DO PROFESSOR)
         ====================================================================== */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span className="uppercase tracking-wider">Rotina Diária Recomendada (30 min):</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSessionBlock('block1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSessionBlock === 'block1'
                  ? 'bg-sky-50 text-sky-800 border border-sky-300 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              1. Aquecimento (5 min)
            </button>
            <button
              onClick={() => setActiveSessionBlock('block2')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSessionBlock === 'block2'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              2. O Verbo do Dia: {currentVerb.base.toUpperCase()} (20 min)
            </button>
            <button
              onClick={() => setActiveSessionBlock('block3')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSessionBlock === 'block3'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              3. Fala Livre & Vida Real (5 min)
            </button>
          </div>
        </div>

        {/* Dica contextual conforme o bloco ativo */}
        {activeSessionBlock === 'block1' && (
          <div className="mt-2.5 p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-700 shrink-0" />
              <span>
                <strong>Bloco 1 (Aquecimento):</strong> Dá uma ouvida rápida nos verbos que você já dominou no painel esquerdo pra destravar o ouvido antes de pegar o verbo novo de hoje.
              </span>
            </div>
            <button
              onClick={() => setActiveSessionBlock('block2')}
              className="font-bold underline text-sky-800 ml-2 shrink-0 cursor-pointer"
            >
              Bora pro Verbo do Dia →
            </button>
          </div>
        )}

        {activeSessionBlock === 'block3' && (
          <div className="mt-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Bloco 3 (Fala Livre Sem Olhar pra Tela):</strong> Levanta aí, toma uma água e fala em voz alta 2 ou 3 frases sobre o seu dia real usando o verbo <strong>{currentVerb.base}</strong> misturado com <em>because, but, so, yesterday</em> ou <em>tomorrow</em>.
              </span>
            </div>
            <button
              onClick={() => setActiveSessionBlock('block2')}
              className="font-bold underline text-emerald-800 ml-2 shrink-0 cursor-pointer"
            >
              Voltar pro Treino
            </button>
          </div>
        )}

        {activeSessionBlock === 'block3' && (
          <div className="mt-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Bloco 3 (Fala Livre Sem Tela):</strong> Levante da cadeira e fale 2 ou 3 frases sobre a sua vida de verdade em voz alta usando o verbo <strong>{currentVerb.base}</strong> conectado com <em>because, but, so, yesterday</em> ou <em>tomorrow</em>.
              </span>
            </div>
            <button
              onClick={() => setActiveSessionBlock('block2')}
              className="font-bold underline text-emerald-800 ml-2 shrink-0 cursor-pointer"
            >
              Voltar aos Exercícios
            </button>
          </div>
        )}
      </div>

      {/* ======================================================================
          CORPO PRINCIPAL DIVIDIDO: MATRIZ EXPANDIDA (ESQ) & TREINADOR (DIR)
         ====================================================================== */}
      <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 items-start">
        
        {/* ====================================================================
            PAINEL ESQUERDO: MATRIZ DOS 3 TEMPOS COM AFIRMATIVAS, NEGATIVAS E PERGUNTAS
           ==================================================================== */}
        <section className="lg:col-span-7 space-y-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <Layers className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight">
                    Matriz dos 3 Tempos & Conjunções
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Todas as fórmulas completas: Afirmativa (+), Negativa (-) e Pergunta (?)
                  </p>
                </div>
              </div>

              {/* Botão para mudar de Nível */}
              <div className="flex items-center gap-1.5">
                {CURRICULUM.map((lvl) => (
                  <button
                    key={lvl.levelId}
                    onClick={() => {
                      saveProgress({ activeLevelId: lvl.levelId, activeVerbIndex: 0, activeRoundIndex: 0 });
                      resetChallengeGates();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeLevelId === lvl.levelId
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {lvl.levelId === 'basic' ? 'Básico' : lvl.levelId === 'intermediate' ? 'Interm.' : 'Avançado'}
                  </button>
                ))}
              </div>
            </div>

            {/* SELEÇÃO DO VERBO ATUAL NA TRILHA DO NÍVEL */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Verbos do {currentLevel.levelName.split(':')[0]}:
                </label>
                <span className="text-xs text-slate-400 font-medium">Faça todos os passos pra destravar o próximo</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentLevel.verbs.map((v, idx) => {
                  const isCurrent = idx === activeVerbIndex;
                  const isUnlocked = idx <= activeVerbIndex;
                  const isCompleted = completedVerbs.includes(`${currentLevel.levelId}-${v.id}`);

                  return (
                    <button
                      key={v.id}
                      onClick={() => {
                        if (isUnlocked) {
                          saveProgress({ activeVerbIndex: idx, activeRoundIndex: 0 });
                          resetChallengeGates();
                        }
                      }}
                      disabled={!isUnlocked}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-900 text-white shadow-xs scale-[1.02]'
                          : isCompleted
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : isUnlocked
                          ? 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                          : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {!isUnlocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                      <span>{v.base.toUpperCase()}</span>
                      <span className="opacity-70 font-normal">({v.pt})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MATRIZ COMPLETA COM PASSADO, PRESENTE E FUTURO (+ / - / ?) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* COLUNA PASSADO */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                <div className="text-xs font-black tracking-wider text-amber-950 uppercase flex items-center justify-between pb-1 border-b border-amber-200/60">
                  <span className="text-sm font-black">Passado</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-100 text-amber-800">
                    -ed / didn't / did?
                  </span>
                </div>

                {/* (+) Afirmativa */}
                <div
                  onClick={() => speakText(`I ${activeMatrixVerb.past}`)}
                  className="bg-white p-3 rounded-xl border border-amber-200/90 shadow-2xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-emerald-700 uppercase flex items-center justify-between">
                    <span>(+) Afirmativa</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    I {activeMatrixVerb.past}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Eu {activeMatrixConj.ptPast1s}
                  </div>
                  <div className="text-[11px] font-mono text-amber-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.pastAff || ''}]
                  </div>
                </div>

                {/* (-) Negativa */}
                <div
                  onClick={() => speakText(`I didn't ${activeMatrixVerb.base}`)}
                  className="bg-white p-3 rounded-xl border border-amber-200/90 shadow-2xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-rose-700 uppercase flex items-center justify-between">
                    <span>(-) Negativa</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    I didn't {activeMatrixVerb.base}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Eu não {activeMatrixConj.ptPast1s}
                  </div>
                  <div className="text-[11px] font-mono text-amber-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.pastNeg || ''}]
                  </div>
                </div>

                {/* (?) Interrogativa */}
                <div
                  onClick={() => speakText(`Did you ${activeMatrixVerb.base}?`)}
                  className="bg-white p-3 rounded-xl border border-amber-200/90 shadow-2xs hover:border-amber-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-sky-700 uppercase flex items-center justify-between">
                    <span>(?) Pergunta</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    Did you {activeMatrixVerb.base}?
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Você {activeMatrixConj.ptPast2s}?
                  </div>
                  <div className="text-[11px] font-mono text-amber-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.pastInt || ''}]
                  </div>
                </div>
              </div>

              {/* COLUNA PRESENTE */}
              <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                <div className="text-xs font-black tracking-wider text-sky-950 uppercase flex items-center justify-between pb-1 border-b border-sky-200/60">
                  <span className="text-sm font-black">Presente</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-sky-100 text-sky-800">
                    base / don't / do?
                  </span>
                </div>

                {/* (+) Afirmativa */}
                <div
                  onClick={() => speakText(`I ${activeMatrixVerb.base}`)}
                  className="bg-white p-3 rounded-xl border border-sky-200/90 shadow-2xs hover:border-sky-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-emerald-700 uppercase flex items-center justify-between">
                    <span>(+) Afirmativa</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    I {activeMatrixVerb.base}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Eu {activeMatrixConj.ptPres1s}
                  </div>
                  <div className="text-[11px] font-mono text-sky-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.presAff || ''}]
                  </div>
                </div>

                {/* (-) Negativa */}
                <div
                  onClick={() => speakText(`I don't ${activeMatrixVerb.base}`)}
                  className="bg-white p-3 rounded-xl border border-sky-200/90 shadow-2xs hover:border-sky-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-rose-700 uppercase flex items-center justify-between">
                    <span>(-) Negativa</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    I don't {activeMatrixVerb.base}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Eu não {activeMatrixConj.ptPres1s}
                  </div>
                  <div className="text-[11px] font-mono text-sky-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.presNeg || ''}]
                  </div>
                </div>

                {/* (?) Interrogativa */}
                <div
                  onClick={() => speakText(`Do you ${activeMatrixVerb.base}?`)}
                  className="bg-white p-3 rounded-xl border border-sky-200/90 shadow-2xs hover:border-sky-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-sky-700 uppercase flex items-center justify-between">
                    <span>(?) Pergunta</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    Do you {activeMatrixVerb.base}?
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Você {activeMatrixConj.ptPres2s}?
                  </div>
                  <div className="text-[11px] font-mono text-sky-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.presInt || ''}]
                  </div>
                </div>
              </div>

              {/* COLUNA FUTURO */}
              <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs">
                <div className="text-xs font-black tracking-wider text-emerald-950 uppercase flex items-center justify-between pb-1 border-b border-emerald-200/60">
                  <span className="text-sm font-black">Futuro</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800">
                    'll / won't / will?
                  </span>
                </div>

                {/* (+) Afirmativa */}
                <div
                  onClick={() => speakText(`I'll ${activeMatrixVerb.base}`)}
                  className="bg-white p-3 rounded-xl border border-emerald-200/90 shadow-2xs hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-emerald-700 uppercase flex items-center justify-between">
                    <span>(+) Afirmativa</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    I'll {activeMatrixVerb.base}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Eu {activeMatrixConj.ptFut1s}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.futAff || ''}]
                  </div>
                </div>

                {/* (-) Negativa */}
                <div
                  onClick={() => speakText(`I won't ${activeMatrixVerb.base}`)}
                  className="bg-white p-3 rounded-xl border border-emerald-200/90 shadow-2xs hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-rose-700 uppercase flex items-center justify-between">
                    <span>(-) Negativa</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    I won't {activeMatrixVerb.base}
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Eu não {activeMatrixConj.ptFut1s}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.futNeg || ''}]
                  </div>
                </div>

                {/* (?) Interrogativa */}
                <div
                  onClick={() => speakText(`Will you ${activeMatrixVerb.base}?`)}
                  className="bg-white p-3 rounded-xl border border-emerald-200/90 shadow-2xs hover:border-emerald-400 cursor-pointer transition-all flex flex-col justify-between min-h-[88px]"
                >
                  <div className="text-[11px] font-bold text-sky-700 uppercase flex items-center justify-between">
                    <span>(?) Pergunta</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-sm font-black text-slate-900 mt-1">
                    Will you {activeMatrixVerb.base}?
                  </div>
                  <div className="text-xs font-medium text-slate-600">
                    Você {activeMatrixConj.ptFut2s}?
                  </div>
                  <div className="text-[11px] font-mono text-emerald-800 mt-0.5">
                    [{activeMatrixVerb.phonetics?.futInt || ''}]
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO DE CONJUNÇÕES E CONECTORES DE FALA */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase">
                  <Link2 className="w-4 h-4 text-indigo-600" />
                  <span>Conjunções pra Conversar sem Travar:</span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                  9 Conectores do Dia a Dia
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-slate-600">
                {CONJUNCTIONS_LIST.map((c) => (
                  <div
                    key={c.en}
                    onClick={() => speakText(c.en)}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 cursor-pointer transition-all flex items-center justify-between shadow-2xs"
                  >
                    <div>
                      <strong className="text-indigo-600 font-bold block">{c.en}</strong>
                      <span className="text-[11px] text-slate-500">{c.pt}</span>
                    </div>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            PAINEL DIREITO: MOTOR LINEAR GUIADO (3 GATES TRAVADOS POR PASSO)
           ==================================================================== */}
        <main className="lg:col-span-5 space-y-4">
          {/* CABEÇALHO DA RODADA ATUAL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                VERBO {activeVerbIndex + 1} DE {currentLevel.verbs.length} • PASSO {activeRoundIndex + 1} DE 10
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border bg-sky-50 text-sky-800 border-sky-200">
                {challenge.tense} • {challenge.form}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-500 font-semibold block">
                Monte em inglês e fale sem travar:
              </span>
              <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                "{challenge.pt}"
              </div>
            </div>

            {/* MARCADOR DE 10 RODADAS DO VERBO */}
            <div className="grid grid-cols-10 gap-1 pt-1">
              {ROUND_TEMPLATES.map((r, idx) => (
                <div
                  key={r.step}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeRoundIndex
                      ? 'bg-sky-600 ring-2 ring-sky-300'
                      : idx < activeRoundIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-200'
                  }`}
                  title={`Passo ${r.step}: ${r.tense} ${r.form}`}
                />
              ))}
            </div>
          </div>

          {/* GATE 1: OUVIR E ABSORVER */}
          <div
            className={`bg-white border-2 rounded-2xl p-5 transition-all shadow-2xs space-y-3 ${
              hasListened ? 'border-emerald-200' : 'border-sky-500 ring-4 ring-sky-500/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    hasListened ? 'bg-emerald-600 text-white' : 'bg-sky-600 text-white'
                  }`}
                >
                  {hasListened ? <Check className="w-3.5 h-3.5" /> : '1'}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Passo 1: Ouça como o nativo fala
                </h3>
              </div>
              {hasListened && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Áudio Ouvido
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">
                  Como soa em português:
                </span>
                <span className="text-sm font-mono font-bold text-sky-800">
                  [{challenge.phonetic}]
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(challenge.en, 1.0)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  Ouvir Áudio (1.0x)
                </button>
                <button
                  onClick={() => speakText(challenge.en, 0.75)}
                  className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl transition-all cursor-pointer"
                  title="Ouvir mais devagar"
                >
                  <Turtle className="w-4 h-4 text-amber-700" />
                </button>
              </div>
            </div>
          </div>

          {/* GATE 2: MONTAR A FRASE COM CONJUNÇÕES E INTERROGAÇÕES */}
          <div
            className={`bg-white border-2 rounded-2xl p-5 transition-all shadow-2xs space-y-4 ${
              !hasListened
                ? 'border-slate-200 opacity-60 pointer-events-none'
                : isAssemblyCorrect
                ? 'border-emerald-200'
                : 'border-sky-500 ring-4 ring-sky-500/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    isAssemblyCorrect
                      ? 'bg-emerald-600 text-white'
                      : hasListened
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isAssemblyCorrect ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : !hasListened ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : (
                    '2'
                  )}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Passo 2: Toque nas palavras na ordem certa pra montar a frase
                </h3>
              </div>
              {isAssemblyCorrect && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Montagem Certinha!
                </span>
              )}
            </div>

            {/* Espaço de Montagem */}
            <div className="min-h-[56px] p-3 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 flex flex-wrap items-center gap-2">
              {selectedChips.length === 0 ? (
                <span className="text-xs text-slate-400">
                  Toque nos blocos abaixo pra montar a frase...
                </span>
              ) : (
                selectedChips.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggleChip(c)}
                    disabled={isAssemblyCorrect}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-rose-600 transition-all cursor-pointer shadow-2xs"
                  >
                    {c.text}
                  </button>
                ))
              )}
            </div>

            {/* Banco de Chips com Conjunções e Interrogações */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500">
                Escolha os blocos certos:
              </span>
              <div className="flex flex-wrap gap-2">
                {poolChips.map((chip) => {
                  const isUsed = selectedChips.some((c) => c.id === chip.id);
                  return (
                    <button
                      key={chip.id}
                      onClick={() => toggleChip(chip)}
                      disabled={isUsed || isAssemblyCorrect}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                        isUsed
                          ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50 shadow-2xs cursor-pointer'
                      }`}
                    >
                      {chip.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {!isAssemblyCorrect && (
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    setSelectedChips([]);
                    setAssemblyValidation(null);
                  }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Limpar
                </button>

                <button
                  onClick={handleVerifyAssembly}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
                >
                  Conferir Frase
                </button>
              </div>
            )}

            {assemblyValidation && (
              <div
                className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                  assemblyValidation.valid
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {assemblyValidation.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">
                    {assemblyValidation.valid ? 'Mandou bem!' : 'Opa, dá uma olhada aqui:'}
                  </div>
                  <p className="mt-0.5">{assemblyValidation.message}</p>
                </div>
              </div>
            )}
          </div>

          {/* GATE 3: TESTE DE VOZ E PRONÚNCIA */}
          <div
            className={`bg-white border-2 rounded-2xl p-5 transition-all shadow-2xs space-y-4 ${
              !isAssemblyCorrect
                ? 'border-slate-200 opacity-60 pointer-events-none'
                : isVoicePassed
                ? 'border-emerald-200'
                : 'border-sky-500 ring-4 ring-sky-500/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                    isVoicePassed
                      ? 'bg-emerald-600 text-white'
                      : isAssemblyCorrect
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isVoicePassed ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : !isAssemblyCorrect ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : (
                    '3'
                  )}
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Passo 3: Fale em voz alta e teste sua pronúncia
                </h3>
              </div>
              {isVoicePassed && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Pronúncia Aprovada!
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-400 block font-semibold">
                  Sua vez de falar:
                </span>
                <span className="text-base font-bold text-slate-900">
                  "{challenge.en}"
                </span>
              </div>
              <span className="text-xs font-mono text-sky-700 font-bold">
                [{challenge.phonetic}]
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleStartVoiceTraining}
                className={`flex-1 min-w-[200px] py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-sky-600 hover:bg-sky-500 text-white'
                }`}
              >
                <Mic className="w-4 h-4" />
                {isRecording ? 'Gravando... Pode falar!' : 'Falar no Microfone'}
              </button>

              <button
                onClick={simulateVoiceSuccess}
                className="py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
                title="Se tiver barulho por aí, fale em voz alta e clique aqui"
              >
                Já Falei em Voz Alta (Validar)
              </button>
            </div>

            {spokenResult && (
              <div
                className={`p-3.5 rounded-xl border space-y-2 ${
                  spokenResult.passed
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900">
                    {spokenResult.passed
                      ? '🎙️ Pronúncia excelente!'
                      : '⚠️ Tenta falar mais uma vez de forma natural:'}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      spokenResult.passed ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                    }`}
                  >
                    {spokenResult.score}% de Precisão
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {spokenResult.words.map((w, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        w.isMatched
                          ? 'bg-white text-emerald-800 border border-emerald-300'
                          : 'bg-white text-rose-800 border border-rose-300'
                      }`}
                    >
                      {w.word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BOTÃO DE AVANÇO PROGRESSIVO (LIBERADO APÓS OS 3 GATES) */}
          <div className="pt-2">
            <button
              onClick={handleNextStep}
              disabled={!canAdvance}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-sm ${
                canAdvance
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {canAdvance ? (
                <>
                  <span>
                    {activeRoundIndex < ROUND_TEMPLATES.length - 1
                      ? `Ir pro Passo ${activeRoundIndex + 2} de 10`
                      : activeVerbIndex < currentLevel.verbs.length - 1
                      ? `Verbo Concluído! Destravar Próximo: ${currentLevel.verbs[activeVerbIndex + 1].base.toUpperCase()}`
                      : 'Nível Concluído! Parabéns!'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Termine a Frase e a Fala pra Liberar</span>
                </>
              )}
            </button>
          </div>
        </main>
      </div>

      {/* ======================================================================
          MODAL DE EVOLUÇÃO, HISTÓRICO E ZERO ESQUECIMENTO
         ====================================================================== */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Sua Evolução nas 500 Horas
                  </h3>
                  <p className="text-xs text-slate-400">Progresso, horas e dias de estudo salvos</p>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Visão de Horas, Minutos de Hoje e Verbos */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs text-slate-400 font-semibold block">Tempo Hoje</span>
                <span className="text-xl font-black text-sky-700">{Math.floor(todaySecondsStudied / 60)} min</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs text-slate-400 font-semibold block">Dias Seguidos (Ofensiva)</span>
                <span className="text-xl font-black text-amber-600">{streakDays} {streakDays === 1 ? 'dia' : 'dias'}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <span className="text-xs text-slate-400 font-semibold block">Verbos Dominados</span>
                <span className="text-xl font-black text-emerald-600">{completedVerbs.length}</span>
              </div>
            </div>

            {/* Ajuste de Meta Diária */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">Sua Meta por Dia</span>
                <span className="text-[11px] text-slate-500">Recomendação do professor: 30 a 35 minutos</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[20, 30, 45].map((m) => (
                  <button
                    key={m}
                    onClick={() => saveProgress({ dailyTargetMinutes: m })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      dailyTargetMinutes === m
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            {/* Verbos Dominados */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Verbos que você já domina:
              </span>
              <div className="flex flex-wrap gap-2">
                {completedVerbs.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">
                    Nenhum verbo concluído ainda. Faça os 10 passos do verbo de hoje pra ele aparecer aqui!
                  </span>
                ) : (
                  completedVerbs.map((vk) => {
                    const [lvl, verbName] = vk.split('-');
                    return (
                      <span
                        key={vk}
                        className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {verbName.toUpperCase()}
                      </span>
                    );
                  })
                )}
              </div>
            </div>

            {/* Linha do Tempo / Histórico de Conquistas */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Histórico de Estudos:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {historyLog.map((log, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-start gap-2.5"
                  >
                    <span className="text-slate-400 font-mono text-[10px] shrink-0 mt-0.5">
                      {log.date}
                    </span>
                    <span className="text-slate-700 font-medium">{log.action}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase cursor-pointer hover:bg-slate-800"
            >
              Bora Continuar o Treino
            </button>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL DE AVISO: META DE 30 MINUTOS ATINGIDA!
         ====================================================================== */}
      {showTimeAlertModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl border border-emerald-200 space-y-5 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-inner">
              <Bell className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                Meta Diária Batida! Parabéns! 🎉
              </h3>
              <p className="text-sm font-semibold text-emerald-700">
                Você estudou {dailyTargetMinutes} minutos hoje com foco total na fala.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Coffee className="w-4 h-4 text-amber-600" />
                <span>Dica de Ouro do Professor:</span>
              </div>
              <p>
                <strong>Hora de descansar a cabeça!</strong> Pra fixar o inglês de verdade e não cansar a mente, 30 a 35 minutos por dia é o ponto perfeito.
              </p>
              <p>
                Se ainda quiser treinar um pouco mais, faça o <strong>Bloco 3 (Fala Livre de 5 minutos)</strong> falando 2 ou 3 frases sobre o seu dia real em voz alta pela casa.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowTimeAlertModal(false);
                  setIsTimerRunning(false);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase cursor-pointer transition-all shadow-xs"
              >
                Encerrar por Hoje
              </button>
              <button
                onClick={() => setShowTimeAlertModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-all"
              >
                Continuar Treinando
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
