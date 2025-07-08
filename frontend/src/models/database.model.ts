export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      levels: {
        Row: {
          level: number
          required_experience: number
        }
        Insert: {
          level: number
          required_experience: number
        }
        Update: {
          level?: number
          required_experience?: number
        }
        Relationships: []
      }
      questions: {
        Row: {
          audio_url: string | null
          choices: Json | null
          correct_answer: string
          created_at: string | null
          difficulty: string
          id: string
          question_text: string
          question_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          choices?: Json | null
          correct_answer: string
          created_at?: string | null
          difficulty?: string
          id?: string
          question_text: string
          question_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          choices?: Json | null
          correct_answer?: string
          created_at?: string | null
          difficulty?: string
          id?: string
          question_text?: string
          question_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_exam_answers: {
        Row: {
          answer_text: string
          answered_at: string | null
          id: string
          is_correct: boolean
          user_exam_question_id: string
        }
        Insert: {
          answer_text: string
          answered_at?: string | null
          id?: string
          is_correct?: boolean
          user_exam_question_id: string
        }
        Update: {
          answer_text?: string
          answered_at?: string | null
          id?: string
          is_correct?: boolean
          user_exam_question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_exam_answers_user_exam_question_id_fkey"
            columns: ["user_exam_question_id"]
            isOneToOne: false
            referencedRelation: "user_exam_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_exam_questions: {
        Row: {
          id: string
          position: number
          question_id: string
          user_exam_id: string
        }
        Insert: {
          id?: string
          position: number
          question_id: string
          user_exam_id: string
        }
        Update: {
          id?: string
          position?: number
          question_id?: string
          user_exam_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_exam_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_exam_questions_user_exam_id_fkey"
            columns: ["user_exam_id"]
            isOneToOne: false
            referencedRelation: "user_exams"
            referencedColumns: ["id"]
          },
        ]
      }
      user_exams: {
        Row: {
          created_at: string | null
          current_question_index: number
          id: string
          question_count: number
          score: number
          status: string
          type: Database["public"]["Enums"]["exam_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_question_index?: number
          id?: string
          question_count?: number
          score?: number
          status?: string
          type?: Database["public"]["Enums"]["exam_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_question_index?: number
          id?: string
          question_count?: number
          score?: number
          status?: string
          type?: Database["public"]["Enums"]["exam_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_payments: {
        Row: {
          created_at: string | null
          id: string
          stripe_customer_id: string | null
          subscription_status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          subscription_status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          experience: number
          id: string
          level: number
        }
        Insert: {
          created_at?: string | null
          experience?: number
          id: string
          level?: number
        }
        Update: {
          created_at?: string | null
          experience?: number
          id?: string
          level?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_experience: {
        Args: { uid: string; xp_to_add: number }
        Returns: undefined
      }
      create_user_exam: {
        Args: {
          p_type: Database["public"]["Enums"]["exam_type"]
          user_id: string
          question_count: number
          p_question_type: string
        }
        Returns: string
      }
      create_user_profile: {
        Args: { uid: string }
        Returns: undefined
      }
      is_email_exist: {
        Args: { emailuser: string }
        Returns: boolean
      }
      is_value_in_jsonb_array: {
        Args: { value: string; arr: Json }
        Returns: boolean
      }
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
      exam_type: "listening-exam" | "reading-exam" | "writing-exam"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      continents: [
        "Africa",
        "Antarctica",
        "Asia",
        "Europe",
        "Oceania",
        "North America",
        "South America",
      ],
      exam_type: ["listening-exam", "reading-exam", "writing-exam"],
    },
  },
} as const
